import { useToast } from "@/components/ui/ToastContainer";

/**
 * Common toast messages used throughout the app
 * This ensures consistent messaging and professional formatting
 */

export const toastMessages = {
  // Loading
  loading: {
    files: () => ({
      title: "Loading files...",
      type: "info" as const,
      duration: 0,
    }),
  },

  // Success messages
  success: {
    fileUploaded: (fileName: string) => ({
      type: "success" as const,
      title: "Upload Successful",
      description: `${fileName} has been uploaded successfully.`,
    }),
    folderCreated: (folderName: string) => ({
      type: "success" as const,
      title: "Folder Created",
      description: `Folder "${folderName}" has been created successfully.`,
    }),
    fileDeleted: (fileName: string) => ({
      type: "success" as const,
      title: "File Deleted",
      description: `"${fileName}" has been permanently deleted.`,
    }),
    starredToggled: (fileName: string, isStarred: boolean) => ({
      type: "success" as const,
      title: isStarred ? "Added to Starred" : "Removed from Starred",
      description: `"${fileName}" has been ${isStarred ? "added to" : "removed from"} starred files.`,
    }),
    trashedToggled: (fileName: string, isTrash: boolean) => ({
      type: "success" as const,
      title: isTrash ? "Moved to Trash" : "Restored",
      description: `"${fileName}" has been ${isTrash ? "moved to trash" : "restored"}.`,
    }),
    trashEmptied: (itemCount: number) => ({
      type: "success" as const,
      title: "Trash Emptied",
      description: `All ${itemCount} items have been permanently deleted.`,
    }),
  },

  // Error messages
  error: {
    fileUploadFailed: () => ({
      type: "error" as const,
      title: "Upload Failed",
      description: "We couldn't upload your file. Please try again.",
    }),
    fileSizeExceeded: () => ({
      type: "error" as const,
      title: "File Too Large",
      description: "File size exceeds 5MB limit. Please upload a smaller file.",
    }),
    folderCreationFailed: () => ({
      type: "error" as const,
      title: "Folder Creation Failed",
      description: "We couldn't create the folder. Please try again.",
    }),
    invalidFolderName: () => ({
      type: "error" as const,
      title: "Invalid Folder Name",
      description: "Please enter a valid folder name.",
    }),
    fileDeletionFailed: () => ({
      type: "error" as const,
      title: "Deletion Failed",
      description: "We couldn't delete the file. Please try again later.",
    }),
    actionFailed: () => ({
      type: "error" as const,
      title: "Action Failed",
      description: "Something went wrong. Please try again.",
    }),
    filesLoadingFailed: () => ({
      type: "error" as const,
      title: "Error Loading Files",
      description: "We couldn't load your files. Please try again later.",
    }),
    authenticationError: () => ({
      type: "error" as const,
      title: "Authentication Error",
      description: "Please sign in to continue.",
    }),
  },

  // Warning messages
  warning: {
    confirmDeletion: (fileName: string) => ({
      type: "warning" as const,
      title: "Confirm Deletion",
      description: `Are you sure you want to delete "${fileName}"? This action cannot be undone.`,
    }),
  },

  // Info messages
  info: {
    filesEmpty: () => ({
      type: "info" as const,
      title: "No Files",
      description: "You haven't uploaded any files yet.",
    }),
  },
};

/**
 * Hook to use predefined toast messages
 * Usage: const { showSuccessToast, showErrorToast } = useToastMessages();
 */
export function useToastMessages() {
  const { showToast } = useToast();

  return {
    showSuccessToast: (title: string, description?: string) => {
      showToast(title, { type: "success", description });
    },
    showErrorToast: (title: string, description?: string) => {
      showToast(title, { type: "error", description });
    },
    showWarningToast: (title: string, description?: string) => {
      showToast(title, { type: "warning", description });
    },
    showInfoToast: (title: string, description?: string) => {
      showToast(title, { type: "info", description });
    },
    showToastFromConfig: (config: {
      title: string;
      type?: "success" | "error" | "warning" | "info";
      description?: string;
      duration?: number;
    }) => {
      showToast(config.title, {
        type: config.type || "info",
        description: config.description,
        duration: config.duration,
      });
    },
  };
}
