import { Link } from "react-router-dom";

export const NavBar = ({
  notOnHomepage,
  notOnQuizPage,
}: {
  notOnHomepage: boolean;
  notOnQuizPage: boolean;
}) => {
  return (
    <div className="navbar">
      {notOnHomepage ? (
        <Link title="To Homepage" to="/">
          <h1 className="active-link">U.S. National Parks</h1>
        </Link>
      ) : (
        <h1>U.S. National Parks</h1>
      )}
      <nav>
        <ul>
          {notOnQuizPage ? (
            <Link to="/quiz" title="Take the Quiz">
              <li className="active-link">Quiz</li>
            </Link>
          ) : (
            <li>Quiz</li>
          )}
          <li>Photo Gallery</li>
        </ul>
      </nav>
    </div>
  );
};
