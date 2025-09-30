import React from "react";
import Title from "./base/Title";
import Text from "./base/Text";
import ContentFragment from "./base/ContentFragment";
import "./CarouselItem.scss";

const { REACT_APP_HOST_URI } = process.env;


const CarouselItem = ({ cf, navigate }) => {
  const image = cf?.bannerimage?.dynamicUrl ? REACT_APP_HOST_URI + cf.bannerimage.dynamicUrl : null;
  const title = cf?.title;
  const subtitle = cf?.subtitle;
  const description = cf?.description;


  return (
    <ContentFragment
      cf={cf}
    >         
      <div className="carousel-caption">
        {image && (
          <img 
            src={image} 
            alt={title || "Carousel image"} 
            className="carousel-image"
          />
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
