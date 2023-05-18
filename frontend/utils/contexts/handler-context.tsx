import { createContext, useContext, useState } from "react";

export interface HandlerContextType {
  onlineUsers: [];
  offlineUsers: [];
  
  setOnlineUsers: (onlineUsers: []) => void;
  setOfflineUsers: (offlineUsers: []) => void;
}

const HandlerContext = createContext<HandlerContextType>({
  onlineUsers: [],
  offlineUsers: [],

  setOnlineUsers: () => {},
  setOfflineUsers: () => {},
});

interface HandlerProviderProps {
  children: React.ReactNode;
}

export const HandlerProvider: React.FC<HandlerProviderProps> = ({
  children,
}) => {
  const [onlineUsers, setOnlineUsers] = useState<[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<[]>([]);

  return (
    <HandlerContext.Provider
      value={{
        onlineUsers: onlineUsers,
        offlineUsers: offlineUsers,

        setOnlineUsers: setOnlineUsers,
        setOfflineUsers: setOfflineUsers,
      }}
    >
      {children}
    </HandlerContext.Provider>
  );
};

export const useHandler = () => {
  const context = useContext(HandlerContext);

  if (context === undefined) {
    throw new Error("useHandler must be used within an AuthProvider");
  }

  return context;
};
