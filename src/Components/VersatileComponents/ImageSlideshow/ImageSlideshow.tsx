import { useEffect, useState } from "react";

type TDirection = "next" | "prev";

const ImageSlideshow = ({
  images,
  showCaption,
  parkCode,
}: {
  images: {
    credit: string;
    title: string;
    altText: string;
    caption: string;
    url: string;
  }[];
  showCaption: boolean;
  parkCode?: string;
}) => {
  /* An images array will always be passed to this component. If originalImgIndex is not passed, this state value will need to be used, so initialize it to a random index of the images array passed. */
  // Maybe only initialize this if !originalImgIndex...
  /*  const [backupImgIndex, setBackupImgIndex] = useState<number>(
    Math.floor(Math.random() * images.length)
  ); */
  const [backupImgIndex, setBackupImgIndex] = useState<number>(0);

  // eventually set to random index of current park's images. will need to get park by parkCode from allNationalParks & use that park's images array
  useEffect(() => {
    setBackupImgIndex(0);
  }, [parkCode]);
  console.log(images);
  console.log(backupImgIndex);

  const changeImage = (
    direction: TDirection,
    imgArray: {
      credit: string;
      title: string;
      altText: string;
      caption: string;
      url: string;
    }[]
  ): void => {
    if (direction === "next") {
      backupImgIndex === imgArray.length - 1
        ? setBackupImgIndex(0)
        : setBackupImgIndex(backupImgIndex + 1);
    } else {
      backupImgIndex === 0
        ? setBackupImgIndex(imgArray.length - 1)
        : setBackupImgIndex(backupImgIndex - 1);
    }
  };

  return (
    <div className="slideshow-container">
      <div className="img-arrows-container">
        {images.length > 1 && (
          <i
            onClick={() => changeImage("prev", images)}
            className="fas fa-angle-right"
            title="Previous Image"
          ></i>
        )}
        <div className="slideshow-img-container">
          {/* If originalImgIndex was passed, use this to index url & altText; else, use backupImgIndex to do so, which is defined above, in this component */}
          <img src={images[backupImgIndex].url} alt={images[backupImgIndex].altText} />
        </div>
        {images.length > 1 && (
          <i
            onClick={() => changeImage("next", images)}
            className="fas fa-angle-right"
            title="Next Image"
          ></i>
        )}
      </div>
      {/* If originalImgIndex was passed, use this to index caption; else, use backupImgIndex to do so, which is defined above, in this component */}
      {showCaption && <p>{images[backupImgIndex].caption}</p>}
    </div>
  );
};
export default ImageSlideshow;
