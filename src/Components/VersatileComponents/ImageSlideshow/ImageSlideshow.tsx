import { useState } from "react";

type TDirection = "next" | "prev";

const ImageSlideshow = ({
  images,
  showCaption,
}: {
  images: {
    credit: string;
    title: string;
    altText: string;
    caption: string;
    url: string;
  }[];
  showCaption: boolean;
}) => {
  const [imgIndex, setImgIndex] = useState<number>(
    Math.floor(Math.random() * images.length - 1)
  );

  if (images[`${imgIndex}`] === undefined) {
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
        {images.length > 1 && (
          <i
            onClick={() => changeImage("prev", imgIndex, images)}
            className="fas fa-angle-right"
            title="Previous Image"
          ></i>
        )}
        <div className="slideshow-img-container">
          <img src={images[`${imgIndex}`].url} alt={images[`${imgIndex}`].altText} />
        </div>
        {images.length > 1 && (
          <i
            onClick={() => changeImage("next", imgIndex, images)}
            className="fas fa-angle-right"
            title="Next Image"
          ></i>
        )}
      </div>
      {showCaption && <p>{images[`${imgIndex}`].caption}</p>}
    </div>
  );
};
export default ImageSlideshow;
