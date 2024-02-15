import { useState } from "react";

type TDirection = "next" | "prev";

const ImageSlideshow = ({
  images,
  showCaption,
  imgIndex,
  setImgIndex,
}: {
  images: {
    credit: string;
    title: string;
    altText: string;
    caption: string;
    url: string;
  }[];
  showCaption: boolean;
  imgIndex?: number;
  setImgIndex?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  /* An images array will always be passed to this component. If imgIndex is not passed, this state value will need to be used, so initialize it to a random index of the images array passed. */
  // Maybe only initialize this if !imgIndex...
  const [cardImgIndex, setCardImgIndex] = useState<number>(
    Math.floor(Math.random() * images.length)
  );

  const changeImage = (
    direction: TDirection,
    imgIndex: number | undefined,
    imgArray: {
      credit: string;
      title: string;
      altText: string;
      caption: string;
      url: string;
    }[]
  ): void => {
    /* If imgIndex & its setter are passed to this component, increment imgIndex, which is used to index current images array: */
    if (imgIndex && setImgIndex) {
      if (direction === "next") {
        imgIndex === imgArray.length - 1 ? setImgIndex(0) : setImgIndex(imgIndex + 1);
      } else {
        imgIndex === 0 ? setImgIndex(imgArray.length - 1) : setImgIndex(imgIndex - 1);
      }
    }
    /* If imgIndex is not passed to this component, increment cardImgIndex, which is used to index current images array: */
    if (!imgIndex) {
      if (direction === "next") {
        cardImgIndex === imgArray.length - 1
          ? setCardImgIndex(0)
          : setCardImgIndex(cardImgIndex + 1);
      } else {
        cardImgIndex === 0
          ? setCardImgIndex(imgArray.length - 1)
          : setCardImgIndex(cardImgIndex - 1);
      }
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
          {/* If imgIndex was passed, use this to index url & altText; else, use cardImgIndex to do so, which is defined above, in this component */}
          <img
            src={imgIndex ? images[imgIndex].url : images[cardImgIndex].url}
            alt={imgIndex ? images[imgIndex].altText : images[cardImgIndex].altText}
          />
        </div>
        {images.length > 1 && (
          <i
            onClick={() => changeImage("next", imgIndex, images)}
            className="fas fa-angle-right"
            title="Next Image"
          ></i>
        )}
      </div>
      {/* If imgIndex was passed, use this to index caption; else, use cardImgIndex to do so, which is defined above, in this component */}
      {showCaption && (
        <p>{imgIndex ? images[imgIndex].caption : images[cardImgIndex].caption}</p>
      )}
    </div>
  );
};
export default ImageSlideshow;
