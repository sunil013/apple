import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { IsDesktop } from "../utils/CssUtil";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const HighlightsVideo = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const isDektop = IsDesktop();
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > hightlightsSlides.length - 1) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;
    let anim; 

    const animUpdate = () => {
        if (span[videoId]) {
            anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
        }
    };

    Object.keys(videoRef.current).forEach((id) => {
        if (id !== videoId.toString()) {
          if(videoDivRef.current[id]){
            gsap.to(videoDivRef.current[id], {
                width: "12px",
            });
          }
            if(span[id]){
            gsap.to(span[id], {
                backgroundColor: "#afafaf",
                width: "0%",
            });
          }
        }
    });

    if (span[videoId]) {
        anim = gsap.to(span[videoId], {
            onUpdate: () => {
                const progress = Math.ceil(anim.progress() * 100);
                if (progress !== currentProgress) {
                    currentProgress = progress;
                    gsap.to(videoDivRef.current[videoId], {
                        width: isDektop ? "4vw" : "10vw",
                    });
                    gsap.to(span[videoId], {
                        width: `${currentProgress}%`,
                        backgroundColor: 'white',
                    });
                }
            },
            onComplete: () => {
                if (isPlaying) {
                    gsap.to(videoDivRef.current[videoId], {
                        width: "12px",
                    });
                    gsap.to(span[videoId], {
                        backgroundColor: "#afafaf",
                    });
                }
            },
        });

        if (videoId === 0) {
            anim.restart();
        }

        if (isPlaying) {
            gsap.ticker.add(animUpdate);
        } else {
            gsap.ticker.remove(animUpdate);
        }
    }

    return () => {
        if (anim) {
            anim.kill();
        }
        gsap.ticker.remove(animUpdate);
    };
}, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true,isPlaying: false }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false,isPlaying: true }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleOnClickDot = (i) => {
    setVideo((prev) => ({
      ...prev,
      videoId: i,
      isLastVideo: i === hightlightsSlides.length - 1,
      isEnd: false,
      isPlaying: true,
    }));

    videoRef.current.forEach((videoElement, index) => {
      if (index !== i) {
        videoElement.pause();
      }
    });
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      <div className="flex item-center">
        {hightlightsSlides.map((item, i) => (
          <div id="slider" key={item.id} className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo, isPlaying: true,
                    }));
                  }}
                  className={`${item.id === 2 && "translate-x-44"} pointer-events-none`}
                  onEnded={() =>
                    i !== hightlightsSlides.length - 1
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  id="video"
                  playsInline={true}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                  preload="auto"
                  muted
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {item.textLists.map((text, index) => (
                  <p key={index} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center mt-10">
        <div className="relative flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className={`mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer ${videoId === i && "pointer-events-none"}`}
              ref={(el) => (videoDivRef.current[i] = el)}
              onClick={() => handleOnClickDot(i)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn" onClick={
          isLastVideo
            ? () => handleProcess("video-reset")
            : !isPlaying
              ? () => handleProcess("play")
              : () => handleProcess("pause")
        }>
          <img
            src={isLastVideo && !isPlaying ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
          />
        </button>
      </div>
    </>
  );
};

export default HighlightsVideo;