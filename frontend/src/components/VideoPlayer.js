import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from 'lucide-react';

const VideoPlayer = ({ videoUrl, title = "ICT Chapter 3 Lecture 3" }) => {
  const { currentThemeId } = useTheme();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Check if it's a YouTube URL
  const isYouTube = videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'));

  // Archive.org video URL
  const archiveUrl = videoUrl || "https://archive.org/details/utkorsho-hsc-24-fpb-2024-hsc-2024-fpc-ict-03-room-1-start-01-20";

  // Extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youTubeVideoId = isYouTube ? getYouTubeVideoId(videoUrl) : null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * duration;
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`
      relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl
      bg-black/90 backdrop-blur-sm border border-white/10
      transition-all duration-300 hover:shadow-3xl
    `}>
      {/* Video Container */}
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={togglePlay}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {isYouTube && youTubeVideoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youTubeVideoId}?autoplay=1&rel=0`}
            className="w-full h-auto aspect-video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          ></iframe>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-auto aspect-video object-contain"
            preload="metadata"
            poster={`https://archive.org/services/img/${archiveUrl.split('/').pop()}`}
          >
            <source src={`${archiveUrl}/format=mp4`} type="video/mp4" />
            <source src={`${archiveUrl}/format=webm`} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Play/Pause Overlay */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110">
              <Play className="w-12 h-12 text-white ml-1" fill="white" />
            </div>
          </div>
        )}

        {/* Controls Overlay - Only show for non-YouTube videos */}
        {!isYouTube && (
          <div className={`
            absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
            p-4 transition-opacity duration-300
            ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}
          `}>
            {/* Progress Bar */}
            <div className="mb-4">
              <div
                className="w-full h-1 bg-white/30 rounded-full cursor-pointer relative"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                {/* Play/Pause */}
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                {/* Skip Back */}
                <button
                  onClick={(e) => { e.stopPropagation(); skip(-10); }}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                {/* Skip Forward */}
                <button
                  onClick={(e) => { e.stopPropagation(); skip(10); }}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* Volume */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Time Display */}
                <div className="text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Fullscreen */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="p-4 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-sm text-gray-300 mt-1">HSC 2024 ICT Chapter 3 - Lecture 3</p>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 2px rgba(0,0,0,0.5);
        }

        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 2px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;