import { useState, useCallback } from 'react';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((toast: Toast) => {
    // Simple console log for now - can be replaced with a proper toast UI component
    if (toast.variant === 'destructive') {
      console.error(`${toast.title}: ${toast.description}`);
      alert(`${toast.title}\n${toast.description}`);
    } else {
      console.log(`${toast.title}: ${toast.description}`);
    }
    
    setToasts((prev) => [...prev, toast]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  }, []);

  return { toast, toasts };
}
