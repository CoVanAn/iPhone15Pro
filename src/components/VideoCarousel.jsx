import { use, useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState([]);

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut',
        })
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
            },
            onComplete: () => {
                setVideo((pre) => ({ ...pre, startPlay: true, isPlaying: true }));
            }
        })
    }, [isEnd, videoId]);

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            }
            else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleLoadedMetadata = (i, e) => setLoadedData((pre) => [...pre, e])

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;
        if (span[videoId]) {
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    if (progress != currentProgress) {
                        currentProgress = progress;
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw',
                        })
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: '#fff',
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            // width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw',
                            width: '12px',
                        })
                        gsap.to(span[videoId], {
                            // width: '100%',
                            backgroundColor: '#afafaf',
                        });
                    }
                },
            })
            if (videoId === 0) {
                anim.restart();
            }
            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }
            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            }
            else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay]);

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isEnd: true,
                    videoId: i + 1
                }))
                break;
            case 'video-last':
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isLastVideo: true
                }))
                break;
            case 'video-reset':
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isLastVideo: false,
                    videoId: 0
                }))
                break;
            case 'play':
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: !prevVideo.isPlaying,
                }));
                break;
            case 'pause':
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: !prevVideo.isPlaying,
                }));
                break;
            default:
                return video;
        }
    }

    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((slide, index) => (
                    <div key={slide.id} id="slider"
                        className="sm:pr-20 pr-10">
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center
                        rounded-3xl overflow-hidden bg-black'>
                                <video
                                    id='video'
                                    playsInline={true}
                                    preload='auto'
                                    muted
                                    className={`${slide.id === 2 && 'translate-x-40'} pointer-events-none`}
                                    ref={(el) => (videoRef.current[index] = el)}
                                    onEnded={() =>
                                        index !== 3 ?
                                            handleProcess('video-end', index)
                                            : handleProcess('video-last')
                                    }
                                    onPlay={() => {
                                        setVideo((prevVideo) => ({
                                            ...prevVideo,
                                            isPlaying: true,
                                        }))
                                    }}
                                    onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                                >
                                    <source src={slide.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {slide.textLists.map((text) => {
                                    return (
                                        <p key={text} className='md:text-2xl text-xl font-medium'>
                                            {text}
                                        </p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-3 backdrop-blur rounded-full'>
                    {videoRef.current.map((_, index) => (
                        <span
                            key={index}
                            ref={(el) => (videoDivRef.current[index] = el)}
                            className='mx-2 w-3 h-3 bg-gray-2 rounded-full relative cursor-pointer'
                        >
                            <span
                                className='absolute h-full w-full rounded-full'
                                ref={(el) => (videoSpanRef.current[index] = el)}
                            />
                        </span>
                    ))}
                </div>
                <div className='control-btn'>
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "pause" : "play"}
                        onClick={isLastVideo
                            ? () => handleProcess('video-reset')
                            : !isPlaying
                                ? () => handleProcess('play')
                                : () => handleProcess('pause')}
                    />
                    {/* </button> */}
                </div>
            </div>
        </>
    )
}

export default VideoCarousel
