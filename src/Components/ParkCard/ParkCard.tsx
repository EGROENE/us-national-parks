import { useState } from "react";
import { TPark } from "../../types";

type TParkCardProps = {
  park: TPark;
};

type TDirection = "next" | "prev";

export const ParkCard = ({ park }: TParkCardProps) => {
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

  return (
    <div className="park-card">
      <div className="park-thumbnail-container">
        <i
          onClick={() => changeThumbnail("prev", imgIndex, park.images)}
          className="fas fa-angle-right"
          title="Previous Image"
        ></i>
        <img src={park.images[`${imgIndex}`].url} alt="" />
        <i
          onClick={() => changeThumbnail("next", imgIndex, park.images)}
          className="fas fa-angle-right"
          title="Next Image"
        ></i>
      </div>
      <header>{park.fullName}</header>
      <p>{park.description}</p>
    </div>
  );
};
