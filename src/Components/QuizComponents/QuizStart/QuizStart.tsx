const QuizStart = ({
  setTotalQuestions,
}: {
  setTotalQuestions: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  return (
    <>
      <h1>Ready to test your knowledge on U.S. National Parks?</h1>
      <h2>Select a number of questions to play & let's get started!</h2>
      <div>
        <button onClick={() => setTotalQuestions(15)}>15</button>
        <button onClick={() => setTotalQuestions(30)}>30</button>
      </div>
    </>
  );
};

export default QuizStart;
