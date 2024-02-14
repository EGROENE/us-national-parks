import { Link } from "react-router-dom";
import { useQuizContext } from "../../../Hooks/useQuizContext";

const NavBar = ({
  notOnHomepage,
  notOnQuizPage,
}: {
  notOnHomepage: boolean;
  notOnQuizPage: boolean;
}) => {
  const { resetQuiz } = useQuizContext();
  return (
    <div
      className={notOnHomepage && !notOnQuizPage ? "navbar only-homepage-link" : "navbar"}
    >
      {notOnHomepage ? (
        <Link
          onClick={() => (!notOnQuizPage ? resetQuiz() : undefined)}
          title="To Homepage"
          to="/"
        >
          <div className="navbar-homepage-link-container">
            <img src="../../bear-favicon.png" />
            <h1>U.S. National Parks</h1>
          </div>
        </Link>
      ) : (
        <div className="navbar-homepage-link-container">
          <img src="../../bear-favicon.png" />
          <h1>U.S. National Parks</h1>
        </div>
      )}
      {notOnQuizPage && (
        <Link to="/quiz">
          <button className="take-quiz-btn">Take the Quiz!</button>
        </Link>
      )}
    </div>
  );
};
export default NavBar;
