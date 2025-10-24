import React from "react";
import { Button } from "@heroui/button";
import { LucideIcon } from "lucide-react";
import ModalPortal from "./ModalPortal";

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "danger" | "warning" | "success" | "default";
  onConfirm: () => void;
  isDangerous?: boolean;
  warningMessage?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconColor = "text-danger",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "danger",
  onConfirm,
  isDangerous = false,
  warningMessage,
}) => {
  if (!isOpen) return null;

  return (
    <ModalPortal 
      isOpen={isOpen} 
      onBackdropClick={() => onOpenChange(false)}
      priority={isDangerous ? "high" : "normal"}
    >
      <div className="p-6 bg-white dark:bg-gray-900">
        {/* Header */}
        <div className={`flex gap-2 items-center pb-4 border-b ${
          isDangerous
            ? "border-red-200 dark:border-red-800"
            : "border-gray-200 dark:border-gray-700"
        }`}>
          {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
          <span className="text-xl font-semibold text-gray-900 dark:text-white">{title}</span>
        </div>

        {/* Body */}
        <div className="py-4">
          {isDangerous && warningMessage && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                {Icon && (
                  <Icon
                    className={`h-5 w-5 mt-0.5 shrink-0 ${iconColor}`}
                  />
                )}
                <div>
                  <p className="font-medium">This action cannot be undone</p>
                  <p className="text-sm mt-1">{warningMessage}</p>
                </div>
              </div>
            </div>
          )}
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>

        {/* Footer */}
        <div className={`flex justify-end gap-2 pt-4 border-t ${
          isDangerous
            ? "border-red-200 dark:border-red-800"
            : "border-gray-200 dark:border-gray-700"
        }`}>
          <Button
            variant="flat"
            color="default"
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            color={confirmColor}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            startContent={Icon && <Icon className="h-4 w-4" />}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ConfirmationModal;