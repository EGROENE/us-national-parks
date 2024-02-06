// Components:
import { useState } from "react";
import { NavBar } from "../../NavBar/NavBar";
import QuizStart from "../QuizStart/QuizStart";

// Constants:
import { quizQuestions } from "../../../constants";

// Methods:
import { shuffleArray } from "../../../methods";

// Types:
import { TQuizQuestion } from "../../../types";

export const QuizMain = () => {
  const [quizLength, setQuizLength] = useState<number | undefined>();

  const randomizedQuestions: unknown[] = shuffleArray(quizQuestions);

  const currentQuestions: TQuizQuestion[] = randomizedQuestions.filter(
    (question) => quizLength && randomizedQuestions.indexOf(question) < quizLength
  );

  return (
    <>
      <NavBar notOnHomepage={true} notOnQuizPage={false} />
      {!quizLength && <QuizStart setQuizLength={setQuizLength} />}
    </>
  );
};
