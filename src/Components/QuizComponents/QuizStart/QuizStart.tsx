const QuizStart = ({
  setQuizLength,
}: {
  setQuizLength: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  return (
    <>
      <h1>Ready to test your knowledge on U.S. National Parks?</h1>
      <h2>Select a number of questions to play & let's get started!</h2>
      <div>
        <button onClick={() => setQuizLength(15)}>15</button>
        <button onClick={() => setQuizLength(30)}>30</button>
      </div>
    </>
  );
};

export default QuizStart;
