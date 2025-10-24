"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  isOpen: boolean;
  onBackdropClick?: () => void;
  children: React.ReactNode;
  priority?: "high" | "normal";
}

class ModalStack {
  private static instance: ModalStack;
  private baseZIndex = 9950;
  private modalCount = 0;
  private highPriorityBase = 11000;

  public static getInstance(): ModalStack {
    if (!ModalStack.instance) {
      ModalStack.instance = new ModalStack();
    }
    return ModalStack.instance;
  }

  getZIndex(priority: "high" | "normal" = "normal"): number {
    this.modalCount++;
    if (priority === "high") {
      return this.highPriorityBase + this.modalCount * 10;
    }
    return this.baseZIndex + this.modalCount * 10;
  }

  releaseZIndex(): void {
    this.modalCount = Math.max(0, this.modalCount - 1);
  }
}

export default function ModalPortal({
  isOpen,
  onBackdropClick,
  children,
  priority = "normal",
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
      {/* 🔹 Background Overlay (dim + blur) */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
        style={{
          zIndex,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onClick={onBackdropClick}
        role="presentation"
      />

      {/* 🔸 Modal Container */}
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{ zIndex: zIndex + 1 }}
      >
        <div
          className="pointer-events-auto w-full max-w-md rounded-2xl bg-white text-black shadow-2xl transform transition-transform duration-300 scale-100"
        >
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}