import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContentFragment from "../components/base/ContentFragment";
import Hero from "../components/Hero";

import CallToActionSection from "../components/CallToActionSection";
import { useBAPageBySlug } from "../api";
import "./Home.scss";
import FlightBookingForm from "../components/FlightBookingForm";
import SaleOffers from "../components/SaleOffers";

const Home = () => {
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedVariation = useMemo(
    () => searchParams.get("variation") || "master",
    [searchParams]
  );

  const { REACT_APP_HOST_URI } = process.env;

  //const { data } = usePageBySlug("home", selectedVariation, fetchTrigger);
  const { data } = useBAPageBySlug("home", selectedVariation, fetchTrigger);

  /*
  const flightPackages = useMemo(() => {
    return fareTypes.map(fareType => {
      const { flightpackagedata } = useFlightPackageById("flight-package", fareType, fetchTrigger);
      return flightpackagedata;
    });
  }, [fareTypes, fetchTrigger]);
  

  const categories = useMemo(() => {
    const map = { master: "Personal Banking" };
    const variations = data?._variations;
    if (variations) {
      variations.forEach((variation) => {
        map[variation] = snakeCaseToTitleCase(variation);
      });
    }
    return map;
  }, [data?._variations]);
*/

  useEffect(() => {
    if (!searchParams.get("variation")) {
      navigate("/?variation=master");
    }
  }, [searchParams, navigate]);

      /*

  useEffect(() => {
    const scrollHandler = () => {
      const parallaxItem = document.getElementById("parallax-item");
      const scrollPosition = window.scrollY;

      const opacity = 1 - (scrollPosition / window.innerHeight) * 4;
      const initialTopPosition = 650;
      const scrollSpeed = 0.6;
      const newTopPosition = initialTopPosition + scrollPosition * scrollSpeed;

      parallaxItem.style.top = newTopPosition + "px";
      parallaxItem.style.opacity = opacity;
    };

    const updateHandler = () => {
      alert("Content Updated");
    };

    document.addEventListener("scroll", scrollHandler);
    document.addEventListener("aue:content-update", updateHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
      document.removeEventListener("aue:content-update", updateHandler);
    };
  }, []);
  */

  //if (!data || !categories.hasOwnProperty(selectedVariation)) return;
/*
  const image = data?.image?._dynamicUrl;
  const title = data?.title;
  const content = data?.content;
  const featuredServices = data?.featuredServices;
*/

  const image = REACT_APP_HOST_URI + data?.image?._dynamicUrl;
  const title = data?.title;
  const slug = data?.slug;
  const content = data?.content;
  const offers = data?.offers;

  return (
    <>
      <ContentFragment cf={data}>
        <Hero image={image} title={title} content={content} />
      </ContentFragment>
      
      <SaleOffers offers={offers} setFetchTrigger={setFetchTrigger} />

      <img src="https://publish-p148716-e1519766.adobeaemcloud.com/content/dam/british-airways/banners/home-page-centre.png" alt="centre-image"  style={{ height: 'auto', width: '100%' }}/>
      <img src="https://publish-p148716-e1519766.adobeaemcloud.com/content/dam/british-airways/banners/home-page-bottom.png" alt="bottom-image"  style={{ height: 'auto', width: '100%' }}/>

    </>
  );
};

export default Home;
