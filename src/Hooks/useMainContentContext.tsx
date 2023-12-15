import { useState } from "react";
import { MainContentContext } from "../Contexts/mainContentContext";

export const useMainContentContext = () => {
  const context = useState(MainContentContext);

  if (!context) {
    throw new Error(
      "useMainContentContext must be used inside MainContentContext provider."
    );
  }

  return context;
};
