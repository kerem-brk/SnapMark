"use client";

import React, { useEffect } from "react";
import { ToastMessage, ToastType } from "@/types";
import { CheckCircle2, Info, AlertCircle, AlertTriangle, X } from "lucide-react";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const getToastIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
    case "error":
      return <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
    case "info":
    default:
      return <Info className="w-4 h-4 text-sky-400 shrink-0" />;
  }
};

const getToastBorder = (type: ToastType) => {
  switch (type) {
    case "success":
      return "border-emerald-500/40 shadow-emerald-500/10";
    case "error":
      return "border-rose-500/40 shadow-rose-500/10";
    case "warning":
      return "border-amber-500/40 shadow-amber-500/10";
    case "info":
    default:
      return "border-sky-500/40 shadow-sky-500/10";
  }
};

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl bg-[#0b1120]/95 backdrop-blur-xl border ${getToastBorder(
        toast.type
      )} shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in`}
    >
      <div className="mt-0.5">{getToastIcon(toast.type)}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-white tracking-tight">{toast.message}</p>
        {toast.description && (
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        title="Kapat"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
