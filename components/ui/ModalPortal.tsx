"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  isOpen: boolean;
  onBackdropClick?: () => void;
  children: React.ReactNode;
  priority?: "high" | "normal";
}

// Using a class to better manage modal stack
class ModalStack {
  private static instance: ModalStack;
  private baseZIndex = 9950;
  private modalCount = 0;
  private highPriorityBase = 11000; // High priority modals start from 11000

  public static getInstance(): ModalStack {
    if (!ModalStack.instance) {
      ModalStack.instance = new ModalStack();
    }
    return ModalStack.instance;
  }

  getZIndex(priority: "high" | "normal" = "normal"): number {
    this.modalCount++;
    if (priority === "high") {
      return this.highPriorityBase + (this.modalCount * 10);
    }
    return this.baseZIndex + (this.modalCount * 10);
  }

  releaseZIndex(): void {
    this.modalCount = Math.max(0, this.modalCount - 1);
  }
}

export default function ModalPortal({
  isOpen,
  onBackdropClick,
  children,
  priority = "normal"
}: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);
  const [zIndex, setZIndex] = useState(() => 
    ModalStack.getInstance().getZIndex(priority)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setZIndex(ModalStack.getInstance().getZIndex(priority));
      return () => {
        ModalStack.getInstance().releaseZIndex();
      };
    }
  }, [isOpen, priority]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop with blur effect */}
      <div
        className={`fixed inset-0 transition-all duration-200 ${
          priority === "high" 
            ? "bg-black/60 backdrop-blur-md" 
            : "bg-black/40"
        }`}
        style={{ zIndex }}
        onClick={onBackdropClick}
        role="presentation"
      />
      {/* Modal Container */}
      <div
        className={`fixed inset-0 pointer-events-none flex items-center justify-center p-4`}
        style={{ zIndex: zIndex + 1 }}
      >
        <div 
          className="pointer-events-auto transform transition-transform duration-200 w-full max-w-md"
        >
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}
