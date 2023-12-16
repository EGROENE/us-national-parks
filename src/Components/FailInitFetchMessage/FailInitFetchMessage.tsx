export const FailInitFetchMessage = () => {
  return (
    <>
      <p>Sorry, there was an error in fetching the data. Please reload the page.</p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </>
  );
};
