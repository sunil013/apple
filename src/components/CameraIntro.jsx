import { useGSAP } from '@gsap/react'
import React from 'react'
import { animateWithGsap } from '../utils/animations'
import { IsDesktop, IsMobile } from '../utils/CssUtil'
import { cameraSampleImages } from '../constants'

const CameraIntro = () => {
  const isMobile = IsMobile();
  const isDesktop =  IsDesktop();

    useGSAP(() => {
      animateWithGsap("#camera_title", {
        opacity: 1,
        duration: 1
      }, {
        scrub: 1,
        end:"bottom 40%"
      });

      animateWithGsap(".camera-intro-image", {
        transform: "matrix(1, 0, 0, 1, 0, 0)",
        duration: 1,
        ease: "power1.out" 
      }, {
        scrub: true,
        end:"top 20%"
      });
    }, []);

    return (
      <section className="common-padding">
        <div className='screen-max-width-small'>
          <h4 id="camera_title" className="text-white text-3xl md:text-5xl font-bold opacity-0 mt-2 md:mb-10 mb-8">
            A camera that captures your wildest imagination.
          </h4>
          <p id="camera_title" className='hiw-text opacity-0'>
            From dramatic framing flexibility to next-generation portraits, see what you can do with our most powerful iPhone camera system.
          </p>
          <div className='w-full flex items-center flex-center'>
            <img 
              src={isMobile ? cameraSampleImages.small : isDesktop ? cameraSampleImages.large : cameraSampleImages.medium} 
              className='camera-intro-image w-full' 
              alt='camera_zoom' 
              style={{transform: isDesktop ? "matrix(1.6, 0, 0, 1.6, 0, 200)":"matrix(1, 0, 0, 1, 0, 0)"}}
            />
            </div>
            <p className='text-gray text-xs md:text-sm'>A green iguana, captured by the 48MP Main camera</p>
        </div>
      </section>
    );
}

export default CameraIntro;