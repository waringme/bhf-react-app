import React from "react";
import Title from "./base/Title";
import Text from "./base/Text";
import ContentFragment from "./base/ContentFragment";
import "./CarouselItem.scss";

const { REACT_APP_HOST_URI } = process.env;


const CarouselItem = ({ cf, navigate }) => {
  // Debug: Let's see what's in the cf object
  console.log('CarouselItem cf:', cf);
  console.log('bannerimage:', cf?.bannerimage);
  
  // Try different ways to access the image
  const image = cf?.bannerimage?.dynamicUrl ? REACT_APP_HOST_URI + cf.bannerimage.dynamicUrl : 
                cf?.bannerimage?._dynamicUrl ? REACT_APP_HOST_URI + cf.bannerimage._dynamicUrl :
                cf?.bannerimage?.url ? REACT_APP_HOST_URI + cf.bannerimage.url :
                cf?.image?.dynamicUrl ? REACT_APP_HOST_URI + cf.image.dynamicUrl :
                cf?.image?._dynamicUrl ? REACT_APP_HOST_URI + cf.image._dynamicUrl :
                null;
  
  console.log('Final image URL:', image);
  
  const title = cf?.title;
  const subtitle = cf?.subtitle;
  const description = cf?.description;


  return (
    <ContentFragment
      cf={cf}
    >         
      <div className="carousel-caption">
        {image ? (
          <img 
            src={image} 
            alt={title || "Carousel image"} 
            className="carousel-image"
            onError={(e) => {
              console.error('Image failed to load:', image);
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="carousel-image-placeholder">
            <p>No image available</p>
            <p>Debug: {JSON.stringify(cf?.bannerimage)}</p>
          </div>
        )}
        <div className="carousel-content">
          <Title heading="h5" prop="title" className="color-light">
            {title}
          </Title>
          <Text
            content={subtitle}
            prop="description"
            className="font-size-large"
          />
          <Text
            content={description}
            prop="description"
            className="font-size-large carousel-price"
          />
        </div>
      </div>
    </ContentFragment>
  );
};

export default CarouselItem;
