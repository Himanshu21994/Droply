import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
    try{
        console.log("=== FOLDER CREATION STARTED ===");
        
        const { userId } = await auth();
        console.log("Authenticated userId:", userId);

        if(!userId){
            console.log("No userId from auth");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const body = await request.json();
        console.log("Request body:", body);
        
        const { name, parentId = null } = body;
        console.log("Parsed name:", name, "parentId:", parentId);
        
        // Don't verify bodyUserId - use the authenticated userId from Clerk instead
        // This is more secure and prevents mismatch issues

        if(!name || typeof name !== "string"|| name.trim().length === 0){
            console.log("Invalid folder name");
            return NextResponse.json({ error: "Invalid folder name" }, { status: 400 });
        }
        
        if(parentId){
            console.log("Checking parent folder:", parentId);
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
                    console.log("Parent folder not found");
                    return NextResponse.json({ error: "Parent folder not found" }, { status: 404 });
                };
        }
        
        const newFolderId = uuidv4();
        console.log("Generated folder ID:", newFolderId);

        // Path ko conditionally banayein
        const folderPath = parentId 
            ? `/folder/${parentId}/${newFolderId}` 
            : `/folder/${newFolderId}`;
        
        console.log("Folder path:", folderPath);

        //create a folder in database
        const folderData: any = {
            id: newFolderId,
            name: name.trim(),
            path: folderPath,
            size: 0,
            fileUrl: "",
            type: "folder",
            isFolder: true,
            isStarred: false,
            isTrash: false,
            userId,
        };
        
        // Only add parentId if it exists
        if (parentId) {
            folderData.parentId = parentId;
        }
        
        console.log("Inserting folder data:", folderData);
        
        const [newFolder] = await db
            .insert(files)
            .values(folderData)
            .returning();
        
        console.log("Folder created successfully:", newFolder);

        return NextResponse.json({ 
            success: true,
            message: "Folder created successfully",
            folder: newFolder,
         });

    }catch (error) {
        console.error("❌ Error creating folder:", error); 
        // Log the full error details
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        return NextResponse.json({ error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}