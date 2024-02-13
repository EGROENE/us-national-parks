import { useState } from "react";
import { TPark } from "../../../types";

type TDirection = "next" | "prev";

const ImageSlideshow = ({ park, showCaption }: { park: TPark; showCaption: boolean }) => {
  const [imgIndex, setImgIndex] = useState<number>(
    Math.floor(Math.random() * (park.images.length - 1))
  );

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
      <div className="slideshow-img-container">
        {park?.images.length > 1 && (
          <i
            onClick={() => changeImage("prev", imgIndex, park?.images)}
            className="fas fa-angle-right"
            title="Previous Image"
          ></i>
        )}
        <img
          src={
            park.images[`${imgIndex}`] !== undefined
              ? park.images[`${imgIndex}`].url
              : park.images[0].url
          }
          alt={
            park.images[`${imgIndex}`] !== undefined
              ? park.images[`${imgIndex}`].altText
              : park.images[0].altText
          }
        />
        {park?.images.length > 1 && (
          <i
            onClick={() => changeImage("next", imgIndex, park?.images)}
            className="fas fa-angle-right"
            title="Next Image"
          ></i>
        )}
      </div>
      {showCaption &&
        (park.images[`${imgIndex}`] !== undefined ? (
          <p>{park?.images[`${imgIndex}`].caption}</p>
        ) : (
          <p>{park?.images[0].caption}</p>
        ))}
    </div>
  );
};
export default ImageSlideshow;
