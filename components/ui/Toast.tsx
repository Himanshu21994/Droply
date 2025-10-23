"use client";

import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  type,
  duration = 5000,
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose(id);
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-400 shrink-0" />;
      default:
        return null;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-green-500/30";
      case "error":
        return "border-red-500/30";
      case "warning":
        return "border-yellow-500/30";
      case "info":
        return "border-blue-500/30";
      default:
        return "border-[#252d4a]";
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500/10";
      case "error":
        return "bg-red-500/10";
      case "warning":
        return "bg-yellow-500/10";
      case "info":
        return "bg-blue-500/10";
      default:
        return "bg-[#1a1f3a]";
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case "success":
        return "text-green-300";
      case "error":
        return "text-red-300";
      case "warning":
        return "text-yellow-300";
      case "info":
        return "text-blue-300";
      default:
        return "text-white";
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ${
        isExiting ? "translate-x-96 opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <div
        className={`${getBackgroundColor()} border ${getBorderColor()} rounded-lg p-4 shadow-lg backdrop-blur-sm max-w-sm w-full`}
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5">{getIcon()}</div>

          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-sm ${getTitleColor()}`}>
              {title}
            </p>
            {description && (
              <p className="text-[#b0b5c1] text-sm mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={handleClose}
            className="shrink-0 text-[#7a7f8f] hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 bg-black/20 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              type === "success"
                ? "bg-green-500"
                : type === "error"
                  ? "bg-red-500"
                  : type === "warning"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
            } rounded-full toast-progress-bar`}
          />
        </div>
      </div>
    </div>
  );
};
