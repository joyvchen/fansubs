'use client';

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  fullScreen?: boolean;
}

export function Modal({ isOpen, onClose, children, title, fullScreen = false }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#121212] animate-slide-up overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-sm z-10 px-5 py-5 flex items-center">
          <button
            onClick={onClose}
            className="p-2 -ml-2 hover:bg-[#282828] rounded-full transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          {title && (
            <h1 className="ml-4 text-white font-bold text-lg">{title}</h1>
          )}
        </div>
        {/* Content */}
        <div className="pb-24">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative bg-[#282828] rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        {title && (
          <div className="sticky top-0 bg-[#282828] px-8 py-5 border-b border-[#404040] flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#404040] rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {/* Content */}
        <div className={title ? '' : 'pt-4'}>
          {children}
        </div>
      </div>
    </div>
  );
}
