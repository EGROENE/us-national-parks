import { useState } from "react";

type TDirection = "next" | "prev";

const ImageSlideshow = ({
  images,
  showCaption,
  originalImgIndex,
  setOriginalImgIndex,
}: {
  images: {
    credit: string;
    title: string;
    altText: string;
    caption: string;
    url: string;
  }[];
  showCaption: boolean;
  originalImgIndex?: number;
  setOriginalImgIndex?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  /* An images array will always be passed to this component. If originalImgIndex is not passed, this state value will need to be used, so initialize it to a random index of the images array passed. */
  // Maybe only initialize this if !originalImgIndex...
  const [backupImgIndex, setBackupImgIndex] = useState<number>(
    Math.floor(Math.random() * images.length)
  );

  const changeImage = (
    direction: TDirection,
    originalImgIndex: number | undefined,
    imgArray: {
      credit: string;
      title: string;
      altText: string;
      caption: string;
      url: string;
    }[]
  ): void => {
    /* If originalImgIndex & its setter are passed to this component, increment originalImgIndex, which is used to index current images array: */
    if (originalImgIndex && setOriginalImgIndex) {
      if (direction === "next") {
        originalImgIndex === imgArray.length - 1
          ? setOriginalImgIndex(0)
          : setOriginalImgIndex(originalImgIndex + 1);
      } else {
        originalImgIndex === 0
          ? setOriginalImgIndex(imgArray.length - 1)
          : setOriginalImgIndex(originalImgIndex - 1);
      }
    }
    /* If originalImgIndex is not passed to this component, increment backupImgIndex, which is used to index current images array: */
    if (!originalImgIndex) {
      if (direction === "next") {
        backupImgIndex === imgArray.length - 1
          ? setBackupImgIndex(0)
          : setBackupImgIndex(backupImgIndex + 1);
      } else {
        backupImgIndex === 0
          ? setBackupImgIndex(imgArray.length - 1)
          : setBackupImgIndex(backupImgIndex - 1);
      }
    }
  };

  return (
    <div className="slideshow-container">
      <div className="img-arrows-container">
        {images.length > 1 && (
          <i
            onClick={() => changeImage("prev", originalImgIndex, images)}
            className="fas fa-angle-right"
            title="Previous Image"
          ></i>
        )}
        <div className="slideshow-img-container">
          {/* If originalImgIndex was passed, use this to index url & altText; else, use backupImgIndex to do so, which is defined above, in this component */}
          <img
            src={
              originalImgIndex ? images[originalImgIndex].url : images[backupImgIndex].url
            }
            alt={
              originalImgIndex
                ? images[originalImgIndex].altText
                : images[backupImgIndex].altText
            }
          />
        </div>
        {images.length > 1 && (
          <i
            onClick={() => changeImage("next", originalImgIndex, images)}
            className="fas fa-angle-right"
            title="Next Image"
          ></i>
        )}
      </div>
      {/* If originalImgIndex was passed, use this to index caption; else, use backupImgIndex to do so, which is defined above, in this component */}
      {showCaption && (
        <p>
          {originalImgIndex
            ? images[originalImgIndex].caption
            : images[backupImgIndex].caption}
        </p>
      )}
    </div>
  );
};
export default ImageSlideshow;
