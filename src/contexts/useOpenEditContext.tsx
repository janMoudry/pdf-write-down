import React, { createContext, SetStateAction, useState } from "react";

const defaultValues = {
  isOpen: false,
  setOpen: null,
};

export const AppContext = createContext<{
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>> | null;
}>(defaultValues);

const OpenEditContext = ({ children }: { children: any }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default OpenEditContext;
