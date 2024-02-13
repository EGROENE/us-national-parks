import { createContext, ReactNode, useState, useEffect } from "react";

import { TQuizContext, TQuizQuestion } from "../types";

import { shuffleQuestionsArray } from "../methods";

import { quizQuestions } from "../constants";

export const QuizContext = createContext<TQuizContext | null>(null);

export const QuizContextProvider = ({ children }: { children: ReactNode }) => {
  const [totalQuestionsSelected, setTotalQuestionsSelected] = useState<
    number | undefined
  >();
  const [currentQuestions, setCurrentQuestions] = useState<TQuizQuestion[] | undefined>();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [randomizedAnswers, setRandomizedAnswers] = useState<
    [string, string][] | undefined
  >();
  const [selectedAnswer, setSelectedAnswer] = useState<[string, string]>(["", ""]);

  const resetQuiz = (): void => {
    document.body.style.backgroundImage = "none";
    setTotalQuestionsSelected(undefined);
    setCurrentQuestions(undefined);
    setQuestionIndex(0);
    setQuestionAnswered(false);
    setRandomizedAnswers(undefined);
    setSelectedAnswer(["", ""]);
    setScore(0);
  };

  useEffect(() => {
    const randomizedQuestions = shuffleQuestionsArray(quizQuestions);
    setCurrentQuestions(
      randomizedQuestions.filter(
        (question) =>
          totalQuestionsSelected &&
          randomizedQuestions.indexOf(question) < totalQuestionsSelected
      )
    );
  }, [totalQuestionsSelected, setCurrentQuestions]);
  const quizLength = currentQuestions?.length;

  const quizContextValues: TQuizContext = {
    totalQuestionsSelected,
    setTotalQuestionsSelected,
    currentQuestions,
    setCurrentQuestions,
    questionIndex,
    setQuestionIndex,
    score,
    setScore,
    questionAnswered,
    setQuestionAnswered,
    randomizedAnswers,
    setRandomizedAnswers,
    selectedAnswer,
    setSelectedAnswer,
    quizLength,
    resetQuiz,
  };

  return (
    <QuizContext.Provider value={quizContextValues}>{children}</QuizContext.Provider>
  );
};
