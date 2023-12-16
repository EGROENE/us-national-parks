import { useContext } from "react";
import { MainContentContext } from "../Contexts/mainContentContext";
import { TMainContentContext } from "../types";

export const useMainContentContext = () => {
  const context = useContext<TMainContentContext | null>(MainContentContext);

  if (!context) {
    throw new Error(
      "useMainContentContext must be used inside MainContentContext provider."
    );
  }

  return context;
};
