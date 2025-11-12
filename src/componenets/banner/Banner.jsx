import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
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

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <motion.img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-[350px] md:h-[450px] object-cover"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white bg-black/40 backdrop-blur-sm px-6 py-6 rounded-2xl shadow-lg">
              <motion.h2
                className="text-2xl md:text-4xl font-bold mb-2"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                {slide.heading}
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl mb-4 text-gray-100"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                {slide.subHeading}
              </motion.p>

              <motion.button
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-full transition shadow-md"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                Explore Now
              </motion.button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
