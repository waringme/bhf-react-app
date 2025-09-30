import React, { useState } from "react";
import SO1 from "../assets/sale-offer-1.jpg"
import SO2 from "../assets/sale-offer-2.jpg"
import SO3 from "../assets/sale-offer-3.jpg"
import SO4 from "../assets/sale-offer-4.jpg"
import CarouselItem from "./CarouselItem";
import "./SaleOffers.scss";
import "./Carousel.scss";

const SaleOffers = ({ offers, setFetchTrigger }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? offers.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="so-block">
      <div className="so-wrapper">
        <div className="so-header">
          <div className="so-header-text">For all your heart health questions, big or small</div>
        </div>

        {/* Carousel Section */}
        <div className="carousel">
          <div
            className="carousel-inner"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {offers?.map((offer, index) => (
              <div
                key={offer.title}
                className={`carousel-item ${
                  index === currentIndex ? "active" : ""
                }`}
              >
                <CarouselItem
                  title="Carousel Item"
                  cf={offer}
                  setFetchTrigger={setFetchTrigger}
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button className="carousel-control prev" onClick={handlePrev}>
            ❮
          </button>
          <button className="carousel-control next" onClick={handleNext}>
            ❯
          </button>
        </div>

  
 

      </div>
    </div>
  );
};

export default SaleOffers;
