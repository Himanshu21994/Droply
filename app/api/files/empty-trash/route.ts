import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import ImageKit from "imagekit";

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all files in trash for this user
    const trashedFiles = await db
      .select()
      .from(files)
      .where(and(eq(files.userId, userId), eq(files.isTrash, true)));

    if (trashedFiles.length === 0) {
      return NextResponse.json(
        { message: "No files in trash" },
        { status: 200 }
      );
    }

    // --- LOGIC FIX START ---
    // Delete files from ImageKit
    const deletePromises = trashedFiles
      // Sirf files delete karein (folders nahi) aur jinka imagekitFileId ho
      .filter((file) => !file.isFolder && file.imagekitFileId) 
      .map(async (file) => {
        try {
          // Seedhe database se mili ID ka use karein
          await imagekit.deleteFile(file.imagekitFileId!); 
        } catch (error) {
          console.error(`Error deleting file ${file.imagekitFileId} from ImageKit:`, error);
        }
      });
    // --- LOGIC FIX END ---

    // Wait for all ImageKit deletions to complete (or fail)
    await Promise.allSettled(deletePromises);

    // Delete all trashed files from the database
    const deletedFiles = await db
      .delete(files)
      .where(and(eq(files.userId, userId), eq(files.isTrash, true)))
      .returning();

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deletedFiles.length} files from trash`,
    });
  } catch (error) {
    console.error("Error emptying trash:", error);
    return NextResponse.json(
      { error: "Failed to empty trash" },
      { status: 500 }
    );
  }
}