"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { Toast, type ToastProps, type ToastType } from "./Toast";

interface ToastContextType {
  showToast: (
    title: string,
    options?: {
      type?: ToastType;
      description?: string;
      duration?: number;
    }
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = useCallback(
    (
      title: string,
      options?: {
        type?: ToastType;
        description?: string;
        duration?: number;
      }
    ) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastProps = {
        id,
        title,
        type: options?.type || "info",
        description: options?.description,
        duration: options?.duration || 5000,
        onClose: (closeId) => {
          setToasts((prev) => prev.filter((t) => t.id !== closeId));
        },
      };

      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-9999 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
