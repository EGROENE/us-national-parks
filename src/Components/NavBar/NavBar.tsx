import { Link } from "react-router-dom";

export const NavBar = ({ notOnHomepage }: { notOnHomepage: boolean }) => {
  return (
    <div className="navbar">
      {notOnHomepage ? (
        <Link title="To Homepage" to="/">
          <h1>U.S. National Parks</h1>
        </Link>
      ) : (
        <h1>U.S. National Parks</h1>
      )}
      <nav>
        <ul>
          <Link to="/quiz" title="Take the Quiz">
            <li>Quiz</li>
          </Link>
          <li>Photo Gallery</li>
        </ul>
      </nav>
    </div>
  );
};
