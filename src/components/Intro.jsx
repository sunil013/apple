import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useState } from 'react'
import { heroVideo, smallHeroVideo } from '../utils'
import { IsDesktop } from '../utils/CssUtil'

const Intro = () => {
 const isDektop = IsDesktop();
 const [videoSrc, setVideoSrc] = useState(!isDektop ? smallHeroVideo : heroVideo)

  useEffect(() => {
   setVideoSrc(isDektop ? heroVideo : smallHeroVideo);
  }, [isDektop]);

  useGSAP(() => {
    gsap.to("#hero",{opacity: 1, delay: 1})
    gsap.to('#cta', { opacity: 1, y: -50, delay: 1.2 })
  },[]);

  return (
    <section className='w-full nav-height bg-black relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12 max-w-[376px] md:max-w-[1200px]">
          <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Intro