import { useState } from "react";
import { TPark } from "../../../types";

type TDirection = "next" | "prev";

const ImageSlideshow = ({ park, showCaption }: { park: TPark; showCaption: boolean }) => {
  const [imgIndex, setImgIndex] = useState<number>(
    Math.floor(Math.random() * (park.images.length - 1))
  );

  if (park.images[`${imgIndex}`] === undefined) {
    setImgIndex(0);
  }

  const changeImage = (
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
    <div className="slideshow-container">
      <div className="img-arrows-container">
        {park?.images.length > 1 && (
          <i
            onClick={() => changeImage("prev", imgIndex, park?.images)}
            className="fas fa-angle-right"
            title="Previous Image"
          ></i>
        )}
        <div className="slideshow-img-container">
          <img
            src={park.images[`${imgIndex}`].url}
            alt={park.images[`${imgIndex}`].altText}
          />
        </div>
        {park?.images.length > 1 && (
          <i
            onClick={() => changeImage("next", imgIndex, park?.images)}
            className="fas fa-angle-right"
            title="Next Image"
          ></i>
        )}
      </div>
      {showCaption && <p>{park?.images[`${imgIndex}`].caption}</p>}
    </div>
  );
};
export default ImageSlideshow;
