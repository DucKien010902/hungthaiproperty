"use client";

import { useEffect, useRef } from "react";

import styles from "./home-video.module.css";

export function HomeVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          video.play().catch(() => {
            // Some browsers still block autoplay if the video is not muted.
          });
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="video" className={styles.section}>
      <div className="site-shell">
        <p className={styles.lead}>
          <span className={styles.leadHighlight}>
            Lĩnh vực hoạt động và định hướng phát triển bền vững của Hưng Thái
            Property.
          </span>
        </p>

        <div className={styles.frame}>
          <video
            ref={videoRef}
            className={styles.video}
            controls
            loop
            muted
            playsInline
            preload="metadata"
            poster="https://res.cloudinary.com/da6f4dmql/image/upload/v1783311266/D%E1%BB%B1_%C3%A1n_H%C3%A0_N%E1%BB%99i_Melody_Residence_zvjolv.jpg"
            src="/Nam Sơn Land video.mp4"
          />
        </div>
      </div>
    </section>
  );
}
