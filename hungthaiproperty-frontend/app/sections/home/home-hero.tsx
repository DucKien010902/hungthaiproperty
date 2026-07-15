"use client";

import { useEffect, useState } from "react";
import styles from "./home-hero.module.css";

const SLIDE_DURATION = 12000;

const slides = [
  {
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1784091424/TTTM_C%C3%82Y_C%E1%BB%8C_cfp5ce.png",
  },
  {
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1783659171/M%E1%BA%AAU_NH%C3%80-08_e4ejhc.png",
  },
  {
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1783658877/G%C3%93C_FLY_CAM_PH%E1%BB%90_4_jpzvyj.jpg",
  },
];

export function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex]);

  const showPrev = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section id="top" className={styles.hero}>
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`${styles.slide} ${
            index === activeIndex ? styles.active : ""
          }`}
        >
          <img src={slide.image} alt="" className={styles.slideImage} />
        </div>
      ))}

      <div className={styles.overlay} />

      <button
        type="button"
        className={`${styles.navButton} ${styles.prevButton}`}
        aria-label="Ảnh trước"
        onClick={showPrev}
      >
        <span aria-hidden="true">‹</span>
      </button>

      <button
        type="button"
        className={`${styles.navButton} ${styles.nextButton}`}
        aria-label="Ảnh sau"
        onClick={showNext}
      >
        <span aria-hidden="true">›</span>
      </button>

      <div className={`site-shell ${styles.content}`}>
        <div className={styles.contentInner}>
          <p className={styles.eyebrow}>HƯNG THÁI PROPERTY</p>

          <div className={styles.dots} aria-label="Chọn ảnh">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                className={`${styles.dot} ${
                  index === activeIndex ? styles.activeDot : ""
                }`}
                aria-label={`Đi tới ảnh ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
