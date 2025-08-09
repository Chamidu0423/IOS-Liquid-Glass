"use client"

import { useEffect, useState } from "react"
import styles from "./ios-liquid-glass.module.css"
import { Github, Star, X } from 'lucide-react'
import { FaApple } from "react-icons/fa"

export default function Page() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setShowPopup(true)
    }, 3000)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      clearTimeout(t)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showPopup])

  function showPopupNow() {
    setShowPopup(true)
  }

  function closePopup() {
    setShowPopup(false)
    try {
      localStorage.setItem("chamidu_popup_seen", "true")
    } catch {}
  }

  function playNotificationSound() {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch {}
  }

  function trackFollow() {
    console.log("🎉 User clicked Follow! Thanks for the support!")
    playNotificationSound()
    closePopup()
  }

  function trackStar() {
    console.log("⭐ User clicked Star! You rock!")
    playNotificationSound()
    closePopup()
  }

  const onPopupBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup()
    }
  }

  const onPopupBtnEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    el.style.transform = "translateY(-2px) scale(1.02)"
  }
  const onPopupBtnLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    el.style.transform = "translateY(0) scale(1)"
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={`${styles.glassContainer} ${styles.headerNav}`}>
          <div className={styles.glassFilter} />
          <div className={styles.glassOverlay} />
          <div className={styles.glassSpecular} />
          <div className={styles.glassContent}>
            <a href="#" className={styles.appleLogo} aria-label="Apple" onClick={(e) => e.preventDefault()}>
              <FaApple size={20} />
            </a>
            <nav className={styles.navLinks} aria-label="Primary">
              <a href="#" onClick={(e) => e.preventDefault()}>Store</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Mac</a>
              <a href="#" onClick={(e) => e.preventDefault()}>iPad</a>
              <a href="#" onClick={(e) => e.preventDefault()}>iPhone</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Vision</a>
              <a href="#" onClick={(e) => e.preventDefault()}>AirPods</a>
              <a href="#" onClick={(e) => e.preventDefault()}>TV &amp; Home</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Support</a>
            </nav>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.heroContent}>
          <h1>Welcome to ios liquid glass UI</h1>
          <div className={`${styles.glassContainer} ${styles.subtitleGlass}`}>
            <div className={styles.glassFilter} />
            <div className={styles.glassOverlay} />
            <div className={styles.glassSpecular} />
            <div className={styles.glassContent}>
              <h2>Hey guys, follow me on Github</h2>
            </div>
          </div>
          <div className={styles.ctaButtons}>
            <a href="#" onClick={(e) => e.preventDefault()} className={`${styles.glassContainer} ${styles.ctaButton}`}>
              <div className={styles.glassFilter} />
              <div className={styles.glassOverlay} />
              <div className={styles.glassSpecular} />
              <span className={styles.buttonText}>Learn more</span>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                showPopupNow()
              }}
              className={`${styles.glassContainer} ${styles.ctaButton}`}
            >
              <div className={styles.glassFilter} />
              <div className={styles.glassOverlay} />
              <div className={styles.glassSpecular} />
              <span className={styles.buttonText}>Notify me</span>
            </a>
          </div>
        </section>
      </main>

      <div
        className={`${styles.popupOverlay} ${showPopup ? styles.show : ""}`}
        id="followPopup"
        onClick={onPopupBgClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <div className={styles.popupContent}>
          <div className={styles.popupGlass}>
            <button className={styles.closeBtn} onClick={closePopup} aria-label="Close popup">
              <X width={20} height={20} />
            </button>
            <div className={styles.popupHeader}>
              <h3 id="popup-title">{"🎉 Yo, you're awesome!"}</h3>
              <p>{"If this liquid glass UI blew your mind, how about showing some love? 🥺💖"}</p>
            </div>
            <div className={styles.popupBody}>
              <div className={styles.popupButtons}>
                <a
                  href="https://github.com/chamidu0423"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.popupBtn} ${styles.followBtn}`}
                  onClick={() => {
                    trackFollow()
                  }}
                  onMouseEnter={onPopupBtnEnter}
                  onMouseLeave={onPopupBtnLeave}
                >
                  <Github width={18} height={18} />
                  {"Follow @chamidu0423"}
                </a>
                <a
                  href="https://github.com/chamidu0423?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.popupBtn} ${styles.starBtn}`}
                  onClick={() => {
                    trackStar()
                  }}
                  onMouseEnter={onPopupBtnEnter}
                  onMouseLeave={onPopupBtnLeave}
                >
                  <Star width={18} height={18} />
                  {"Star My Repos"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <filter
          id="lensFilter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feDisplacementMap in="SourceGraphic" in2="blur" scale="75" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  )
}
