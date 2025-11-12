import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  const slides = [
    {
      image: "https://i.ibb.co.com/s9Kf8f3k/picture-3.webp",
      heading: "Breathe in the Green",
  subHeading: "Find peaceful nature spots near you",
    },
    {
      image: "https://i.ibb.co.com/PGNWc4xY/pic-2.jpg",
      heading: "Explore Eco Trails",
  subHeading: "Discover hidden trails and scenic routes",
    },
    {
      image: "https://i.ibb.co.com/jP3StB8t/pictur4.webp", 
      heading: "Nature at Your Fingertips",
  subHeading: "Track eco-friendly outdoor adventures",
    },
    {
      image: "https://i.ibb.co.com/Kjq2cbq1/picture-1.webp", 
       heading: "Protect What You Love",
  subHeading: "Support conservation while exploring",
    },
  ];

  return (
    <div className="relative ">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-[350px] md:h-[450px] object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.heading}</h2>
              <p className="text-xxl md:text-xl mb-4">{slide.subHeading}</p>
              <button className="bg-primary px-6 py-2 rounded hover:white transition">
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;