import { Link } from "react-router-dom";

const NavBar = ({
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
export default NavBar;
