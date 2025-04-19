'use client';

import React from 'react';

const ScrollArrow: React.FC = () => {
  return (
    <div className="absolute flex flex-col items-center
            bottom-0
            sm:bottom-0
            md:bottom-130
            lg:bottom-40
            xl:-bottom-10
            2xl:bottom-25">
      <Chevron delay="0s" />
      <Chevron delay="0.1s" className="-mt-10" />
    </div>
  );
};

interface ChevronProps {
  delay: string;
  className?: string;
}

const Chevron: React.FC<ChevronProps> = ({ delay, className = '' }) => (
  <svg
    className={`w-16 h-16 text-white animate-chevron ${className}`}
    style={{ animationDelay: delay }}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    <style jsx>{`
      @keyframes chevron {
        0% {
          opacity: 0;
          transform: translateY(-4px);
        }
        50% {
          opacity: 1;
          transform: translateY(2px);
        }
        100% {
          opacity: 0;
          transform: translateY(8px);
        }
      }
      .animate-chevron {
        animation: chevron 1.5s infinite;
      }
    `}</style>
  </svg>
);

export default ScrollArrow;