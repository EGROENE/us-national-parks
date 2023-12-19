import { useState } from "react";
import { TPark } from "../../types";
import { statesArray } from "../../constants";

type TDirection = "next" | "prev";

export const ParkCard = ({ park }: { park: TPark }) => {
  const [imgIndex, setImgIndex] = useState<number>(
    Math.floor(Math.random() * park.images.length)
  );

  const changeThumbnail = (
    direction: TDirection,
    imgIndex: number,
    imgArray: {
      credit: string;
      title: string;
      altText: string;
      caption: string;
      url: string;
    }[]
  ): void => {
    if (direction === "next") {
      imgIndex === imgArray.length - 1 ? setImgIndex(0) : setImgIndex(imgIndex + 1);
    } else {
      imgIndex === 0 ? setImgIndex(imgArray.length - 1) : setImgIndex(imgIndex - 1);
    }
  };

  const parkStates = () => {
    if (park.states.length > 3) {
      const stateIndices = park.states.replace(/,/g, " ").split(" ");
      return stateIndices.map((index) => statesArray[index]).join(", ");
    }
    return statesArray[`${park.states}`];
  };

  return (
    <div className="park-card">
      <div className="park-thumbnail-container">
        {park.images.length > 1 && (
          <i
            onClick={() => changeThumbnail("prev", imgIndex, park.images)}
            className="fas fa-angle-right"
            title="Previous Image"
          ></i>
        )}
        <img
          src={park.images[`${imgIndex}`].url}
          alt={park.images[`${imgIndex}`].altText}
        />
        {park.images.length > 1 && (
          <i
            onClick={() => changeThumbnail("next", imgIndex, park.images)}
            className="fas fa-angle-right"
            title="Next Image"
          ></i>
        )}
      </div>
      <header>{park.fullName}</header>
      <p>
        <span>{park.states.length > 3 ? "States: " : "State: "} </span>
        {parkStates()}
      </p>
      <p>{park.description}</p>
    </div>
  );
};
