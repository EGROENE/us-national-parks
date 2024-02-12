import { useContext } from "react";
import { QuizContext } from "../Contexts/quizContext";

export const useQuizContext = () => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuizContext must be used inside QuizContext provider.");
  }

  return context;
};
