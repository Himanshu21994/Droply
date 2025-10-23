import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
    try{
        const { userId } = await auth();

        if(!userId){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await request.json();
        const { name, userId: bodyUserId, parentId= null } = body;
        
        if(bodyUserId !== userId){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if(!name || typeof name !== "string"|| name.trim().length === 0){
            return NextResponse.json({ error: "Invalid folder name" }, { status: 400 });
        }
        if(parentId){
            const [parentFolder] = await db
                .select()
                .from(files)
                .where(
                    and(
                        eq(files.id, parentId),
                        eq(files.userId, userId),
                        eq(files.isFolder, true)
                    )
                
                )
                if(!parentFolder){
                    return NextResponse.json({ error: "Parent folder not found" }, { status: 404 });
                };
        }
        
        const newFolderId = uuidv4();

        // Path ko conditionally banayein
        const folderPath = parentId 
            ? `/folder/${parentId}/${newFolderId}` 
            : `/folder/${newFolderId}`;

        //create a folder in database
        const folderData = {
            id: newFolderId, // Pehle generate kiya gaya ID use karein
            name: name.trim(),
            path: folderPath, // Corrected path use karein
            size: 0,
            fileUrl: "",
            thumbnailUrl: null,
            userId,
            parentId,
            type: "folder",
            isFolder: true,
            isStarred: false,
            isTrash: false,
        };
        const [newFolder] = await db
            .insert(files)
            .values(folderData)
            .returning();

        return NextResponse.json({ 
            success: true,
            message: "Folder created successfully",
            folder: newFolder,
         });

    }catch (error) {
        console.error("Error creating folder:", error); 
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}