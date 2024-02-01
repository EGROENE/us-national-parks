// Should return message & loading animation
export const LoadingMessage = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <i className="fas fa-paw paw-1"></i>
        <i className="fas fa-paw paw-2"></i>
        <i className="fas fa-paw paw-3"></i>
      </div>
      <p className="init-loading-or-error-message">
        Wait a sec while we retrieve the data...
      </p>
    </div>
  );
};
