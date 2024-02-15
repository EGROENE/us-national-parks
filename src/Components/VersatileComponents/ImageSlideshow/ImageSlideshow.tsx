import { useEffect, useState } from "react";

type TDirection = "next" | "prev";

const ImageSlideshow = ({
  images,
  showCaption,
  parkCode,
  onHomepage,
}: {
  images: {
    credit: string;
    title: string;
    altText: string;
    caption: string;
    url: string;
  }[];
  showCaption: boolean;
  parkCode?: string; // from component where it's possibly undefined, so must be of type 'string | undefined' here
  onHomepage?: boolean;
}) => {
  const [backupImgIndex, setBackupImgIndex] = useState<number | undefined>();

  /* If ParkCard is on homepage, setBackupImgIndex to random number, depending on length of images array. If not on homepage, setBackupImgIndex to zero to avoid potential 'undefined' errors: */
  useEffect(() => {
    onHomepage
      ? setBackupImgIndex(Math.floor(Math.random() * images.length))
      : setBackupImgIndex(0);
  }, [parkCode, images.length, onHomepage]);
  /* console.log(parkCode);
  console.log(images.length);
  console.log(backupImgIndex); */

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
    if (backupImgIndex !== undefined) {
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
            onClick={() => changeImage("prev", images)}
            className="fas fa-angle-right"
            title="Previous Image"
          ></i>
        )}
        <div className="slideshow-img-container">
          {/* If backupImgIndex is specifically not undefined (not just falsy), show image/alt text. backupImgIndex should never be falsy, as its value is set whenever this component renders, though it is initialized as undefined. It's not good practice to initialize it, then change it again as soon as component renders. */}
          {backupImgIndex !== undefined && (
            <img src={images[backupImgIndex].url} alt={images[backupImgIndex].altText} />
          )}
        </div>
        {images.length > 1 && (
          <i
            onClick={() => changeImage("next", images)}
            className="fas fa-angle-right"
            title="Next Image"
          ></i>
        )}
      </div>
      {showCaption && backupImgIndex !== undefined && (
        <p>{images[backupImgIndex].caption}</p>
      )}
    </div>
  );
};
export default ImageSlideshow;
