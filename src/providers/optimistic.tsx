"use client";

import React, { createContext, useContext, useState } from "react";

type OptimisticContextType<T> = {
  optimisticItems: T[];
  addOptimisticItems: (item: T) => void;
  removeOptimisticItems: (item: T) => void;
  updateOptimisticItems: (item: T, index: number) => void;
};

const OptimisticContext = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OptimisticContextType<any> | undefined
>(undefined);

export default function OptimisticProvider<T>({
  children,
  initialItems,
}: {
  children: React.ReactNode;
  initialItems: T[];
}) {
  const [optimisticItems, setOptimisticItems] = useState<T[]>(initialItems);

  const addOptimisticItems = (newItem: T) => {
    setOptimisticItems((prevItems) => [newItem, ...prevItems]);
  };

  const removeOptimisticItems = (removedItem: T) => {
    setOptimisticItems((prevItems) =>
      prevItems.filter((item) => item !== removedItem),
    );
  };

  const updateOptimisticItems = (updatedItem: T, index: number) => {
    setOptimisticItems((prevItems) => {
      return [updatedItem, ...prevItems.filter((_, i) => i !== index)];
    });
  };

  return (
    <OptimisticContext.Provider
      value={{
        optimisticItems,
        addOptimisticItems,
        removeOptimisticItems,
        updateOptimisticItems,
      }}
    >
      {children}
    </OptimisticContext.Provider>
  );
}

export function useOptimistic<T>() {
  const context = useContext(OptimisticContext) as OptimisticContextType<T>;
  if (context === undefined) {
    throw new Error("useOptimistic must be used within an OptimisticProvider");
  }

  return context;
}
