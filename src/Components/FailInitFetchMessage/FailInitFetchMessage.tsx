export const FailInitFetchMessage = () => {
  return (
    <>
      <p className="init-loading-or-error-message">
        Sorry, there was an error in fetching the data. Please reload the page.
      </p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </>
  );
};
