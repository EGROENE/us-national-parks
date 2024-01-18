export const FailInitFetchMessage = ({ errorCode }: { errorCode?: string }) => {
  return (
    <div className="fail-fetch-message-container">
      <p className="init-loading-or-error-message">
        {errorCode === "429"
          ? "Too many requests have been made to the server. Please try again later."
          : "Sorry, there was an error in fetching the data. Please reload the page."}
      </p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  );
};
