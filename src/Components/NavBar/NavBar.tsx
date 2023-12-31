import { Link } from "react-router-dom";

export const NavBar = ({ notOnHomepage }: { notOnHomepage: boolean }) => {
  return (
    <div className="navbar">
      {notOnHomepage ? (
        <Link to="/">
          <h1>U.S. National Parks</h1>
        </Link>
      ) : (
        <h1>U.S. National Parks</h1>
      )}
      <nav>
        <ul>
          <li>Quiz</li>
          <li>Photo Gallery</li>
        </ul>
      </nav>
    </div>
  );
};
