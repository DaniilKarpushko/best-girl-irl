import { useState, useEffect, useCallback } from 'react'
import './HeartGallery.css'

const galleryData = [
    {
        photo: '../assets/1.jpg',
        text: 'Самая вкусная еда - твоя'
    },
    {
        photo: '../assets/2.jpg',
        text: 'Самые лучшие моменты - с тобой'
    },
    {
        photo: '../assets/3.jpg',
        text: 'Ты светишься ярче звезд'
    },
    {
        photo: '../assets/4.jpg',
        text: 'Твоя нежность не знает границ'
    },
    {
        photo: '../assets/5.jpg',
        text: 'Самое сладкое - твои поцелуи'
    }
]

function HeartGallery() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [direction, setDirection] = useState(null)
    const [touchStart, setTouchStart] = useState(null)

    const navigate = useCallback((dir) => {
        if (isTransitioning) return
        setDirection(dir)
        setIsTransitioning(true)

        setTimeout(() => {
            setCurrentIndex(prev => {
                if (dir === 'next') return (prev + 1) % galleryData.length
                return (prev - 1 + galleryData.length) % galleryData.length
            })
            setIsTransitioning(false)
        }, 300)
    }, [isTransitioning])

    const goNext = useCallback(() => navigate('next'), [navigate])
    const goPrev = useCallback(() => navigate('prev'), [navigate])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') goNext()
            if (e.key === 'ArrowLeft') goPrev()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [goNext, goPrev])

    // Touch/swipe support
    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX)
    }

    const handleTouchEnd = (e) => {
        if (touchStart === null) return
        const touchEnd = e.changedTouches[0].clientX
        const diff = touchStart - touchEnd
        if (Math.abs(diff) > 50) {
            if (diff > 0) goNext()
            else goPrev()
        }
        setTouchStart(null)
    }

    const currentItem = galleryData[currentIndex]

    return (
        <div
            className="heart-gallery"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Left Arrow */}
            <button
                className="nav-arrow nav-arrow--left"
                onClick={goPrev}
                aria-label="Previous photo"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            {/* Heart Container */}
            <div className="heart-container">
                <div className="heart-wrapper">
                    {/* Heart SVG with clipping */}
                    <svg
                        className="heart-svg"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <clipPath id="heartClip">
                                <path d="M256 477.5S10 316.5 10 175.5C10 98.8 72.8 36 149.5 36c46.1 0 86.9 22.4 112.5 56.8C287.6 58.4 316.4 36 362.5 36 439.2 36 502 98.8 502 175.5c0 141-246 302-246 302z" />
                            </clipPath>
                            {/* Gradient for heart border/glow */}
                            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff4b6e" />
                                <stop offset="50%" stopColor="#ff1744" />
                                <stop offset="100%" stopColor="#d50032" />
                            </linearGradient>
                            <filter id="heartGlow">
                                <feGaussianBlur stdDeviation="8" result="glow" />
                                <feMerge>
                                    <feMergeNode in="glow" />
                                    <feMergeNode in="glow" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Heart background fill */}
                        <path
                            d="M256 477.5S10 316.5 10 175.5C10 98.8 72.8 36 149.5 36c46.1 0 86.9 22.4 112.5 56.8C287.6 58.4 316.4 36 362.5 36 439.2 36 502 98.8 502 175.5c0 141-246 302-246 302z"
                            fill="url(#heartGradient)"
                            filter="url(#heartGlow)"
                            className="heart-bg"
                        />

                        {/* Photo inside heart */}
                        <g clipPath="url(#heartClip)">
                            <image
                                href={currentItem.photo}
                                x="30"
                                y="36"
                                width="452"
                                height="442"
                                preserveAspectRatio="xMidYMid slice"
                                className={`heart-image ${isTransitioning ? `fade-out-${direction}` : 'fade-in'}`}
                            />
                            {/* Overlay to blend edges */}
                            <path
                                d="M256 477.5S10 316.5 10 175.5C10 98.8 72.8 36 149.5 36c46.1 0 86.9 22.4 112.5 56.8C287.6 58.4 316.4 36 362.5 36 439.2 36 502 98.8 502 175.5c0 141-246 302-246 302z"
                                fill="none"
                                stroke="url(#heartGradient)"
                                strokeWidth="12"
                            />
                        </g>
                    </svg>
                </div>

                {/* Text below heart */}
                <p className={`heart-text ${isTransitioning ? 'text-fade-out' : 'text-fade-in'}`}>
                    {currentItem.text}
                </p>

                {/* Dot indicators */}
                <div className="dots">
                    {galleryData.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'dot--active' : ''}`}
                            onClick={() => {
                                if (index === currentIndex || isTransitioning) return
                                setDirection(index > currentIndex ? 'next' : 'prev')
                                setIsTransitioning(true)
                                setTimeout(() => {
                                    setCurrentIndex(index)
                                    setIsTransitioning(false)
                                }, 300)
                            }}
                            aria-label={`Go to photo ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Right Arrow */}
            <button
                className="nav-arrow nav-arrow--right"
                onClick={goNext}
                aria-label="Next photo"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>
        </div>
    )
}

export default HeartGallery