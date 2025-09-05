import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./StoriesOfHope.css";

const stories = [
  {
    name: "Jasmine",
    before: "Jasmine.jpg",
    after: "Jasmine_af.jpg",
    description: "Rescued from severe malnutrition, now healthy and happy.",
  },
  {
    name: "Thor",
    before: "Thor.jpg",
    after: "Thor_af.jpg",
    description: "Abandoned on the street, now thriving under our care.",
  },
    {
    name: "Crysta",
    before: "Crysta.jpg",
    after: "Cry.jpg",
    description: "Severely injured and vulnerable when found.Now healthy, playful, and happily adopted by a loving family",
  },  {
    name: "Lizzy",
    before: "Lizzy.jpg",
    after: "",
    description: "Abandoned on the street, now thriving under our care.",
  },
  // Add more stories as needed
];

const FadeCard = ({ story }) => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div
      className="story-card fade-card"
      onMouseEnter={() => setShowAfter(true)}
      onMouseLeave={() => setShowAfter(false)}
    >
      <img
        src={story.before}
        alt={`${story.name} before`}
        className={`story-img-before ${showAfter ? "fade-out" : "fade-in"}`}
      />
      <img
        src={story.after}
        alt={`${story.name} after`}
        className={`story-img-after ${showAfter ? "fade-in" : "fade-out"}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
      <div className="story-info">
        <div className="story-name">{story.name}</div>
        <div className="story-desc">{story.description}</div>
      </div>
    </div>
  );
};

const StoriesOfHope = () => (
  <section className="stories-section">
    <div className="stories-header">
      <div className="section-title">Stories of Hope</div>
      <div className="stories-subtitle">
        Witness the transformation of animals rescued by our team.
      </div>
    </div>
    <div className="stories-swiper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
        loop={true}
        grabCursor={true}
      >
        {stories.map((story, idx) => (
          <SwiperSlide key={idx}>
            <FadeCard story={story} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default StoriesOfHope;
