export const FailInitFetchMessage = ({
  errorCode,
  margin,
  buttonColor,
}: {
  errorCode?: string;
  margin?: string;
  buttonColor?: string;
}) => {
  return (
    <div className="fail-fetch-message-container">
      <p style={{ margin: margin }} className="init-loading-or-error-message">
        {errorCode === "429"
          ? "Too many requests have been made to the server. Please try again later."
          : "Sorry, there was an error in fetching the data. Please reload the page."}
      </p>
      <button
        className="reload-btn"
        style={{ backgroundColor: buttonColor }}
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
};
