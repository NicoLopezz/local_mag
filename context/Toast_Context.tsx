import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Toast } from "../components/atoms/notification/Toast";

interface ToastContextProps {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

interface ProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ProviderProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  useEffect(() => {
    if (!message) return;

    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 2500); 

    const cleanupTimeout = setTimeout(() => {
      setMessage(null);
    }, 2500); 

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(cleanupTimeout);
    };
  }, [message]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && <Toast message={message} onClose={() => setVisible(false)} visible={visible} />}
    </ToastContext.Provider>
  );
};
