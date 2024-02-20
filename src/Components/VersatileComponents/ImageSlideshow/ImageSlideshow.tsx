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
  const [imgIndex, setImgIndex] = useState<number | undefined>();

  const [slideshowDirection, setSlideshowDirection] = useState<TDirection>("next");

  /* If ParkCard is on homepage, setImgIndex to random number, depending on length of images array. If not on homepage, setImgIndex to zero to avoid potential 'undefined' errors: */
  useEffect(() => {
    onHomepage ? setImgIndex(Math.floor(Math.random() * images.length)) : setImgIndex(0);
  }, [parkCode, images.length, onHomepage]);

  const changeImage = (direction: TDirection): void => {
    /* Necessary to setSlideshowDirection state value here (its existence is necessary, too) because, if an image doesn't exist (error 404 occurs on the image) while user is scrolling through a park's images, the image that follows the erroneous image in the sequence, whether the user is moving forward or backward through the image array, should be displayed, & the onError callback function needs to know the direction in which the user is scrolling through the images. */
    if (direction !== slideshowDirection) {
      setSlideshowDirection(direction);
    }
    if (imgIndex !== undefined) {
      if (direction === "next") {
        imgIndex === images.length - 1 ? setImgIndex(0) : setImgIndex(imgIndex + 1);
      } else {
        imgIndex === 0 ? setImgIndex(images.length - 1) : setImgIndex(imgIndex - 1);
      }
    }
  };

  return (
    <div className="slideshow-container">
      <div
        className={
          images.length > 1 ? "img-arrows-container" : "img-arrows-container centered"
        }
      >
        {images.length > 1 && (
          <i
            onClick={() => {
              changeImage("prev");
            }}
            className="fas fa-angle-right"
            title="Previous Image"
          ></i>
        )}
        <div className="slideshow-img-container">
          {/* If imgIndex is specifically not undefined (not just falsy), show image/alt text. imgIndex should never be falsy, as its value is set whenever this component renders, though it is initialized as undefined. It's not good practice to initialize it, then change it again as soon as component renders. */}
          {imgIndex !== undefined && (
            <img
              src={images[imgIndex].url}
              alt={images[imgIndex].altText}
              onError={() => changeImage(slideshowDirection)}
            />
          )}
        </div>
        {images.length > 1 && (
          <i
            onClick={() => {
              changeImage("next");
            }}
            className="fas fa-angle-right"
            title="Next Image"
          ></i>
        )}
      </div>
      {showCaption && imgIndex !== undefined && <p>{images[imgIndex].caption}</p>}
    </div>
  );
};
export default ImageSlideshow;
