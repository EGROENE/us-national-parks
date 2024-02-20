const FailFetchMessage = ({ isError429 }: { isError429?: boolean }) => {
  return (
    <div className="fail-fetch-message-container">
      <p className="fetch-error-message">
        {isError429
          ? "Too many requests have been made to the server. Please try again later."
          : "Sorry, there was an error in fetching the data. Please reload the page."}
      </p>
      <button className="reload-btn" onClick={() => window.location.reload()}>
        Reload Page
      </button>
    </div>
  );
};
export default FailFetchMessage;
