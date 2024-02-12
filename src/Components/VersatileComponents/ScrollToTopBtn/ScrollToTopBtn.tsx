const ScrollToTopBtn = ({
  distanceScrolledFromTop,
}: {
  distanceScrolledFromTop: number;
}) => {
  return (
    <i
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={
        distanceScrolledFromTop > 150
          ? "fas fa-angle-right animate__animated animate__fadeInUp"
          : "fas fa-angle-right animate__animated animate__fadeOutDown"
      }
      title="Back to Top"
      id="scroll-to-top-btn"
    ></i>
  );
};
export default ScrollToTopBtn;
