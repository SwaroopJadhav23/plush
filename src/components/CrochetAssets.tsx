import React from 'react';

// Common style variables for stitches
const stitchDash = "3 2";

export const CrochetFlower: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Petals */}
    <path
      d="M50 20 C40 5, 20 15, 30 35 C10 35, 5 55, 25 60 C15 80, 35 90, 50 75 C65 90, 85 80, 75 60 C95 55, 90 35, 70 35 C80 15, 60 5, 50 20 Z"
      fill="#E8829E"
      fillOpacity="0.8"
      stroke="#8E2A46"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Outer Stitch Overlay */}
    <path
      d="M50 22 C42 8, 24 18, 32 36 C13 36, 9 53, 27 58 C18 76, 36 85, 49 72 C63 85, 81 76, 72 58 C90 53, 86 36, 67 36 C75 18, 57 8, 50 22 Z"
      stroke="#FFF8F3"
      strokeWidth="1.5"
      strokeDasharray={stitchDash}
      strokeLinecap="round"
    />
    {/* Flower Center */}
    <circle cx="50" cy="50" r="16" fill="#E0A93A" stroke="#8E2A46" strokeWidth="2" />
    <circle cx="50" cy="50" r="11" stroke="#FFF8F3" strokeWidth="1.2" strokeDasharray="2 1.5" fill="none" />
  </svg>
);

export const CrochetHeart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Base Heart */}
    <path
      d="M50 82 C45 78, 15 50, 15 32 C15 18, 27 10, 38 15 C45 18, 50 25, 50 25 C50 25, 55 18, 62 15 C73 10, 85 18, 85 32 C85 50, 55 78, 50 82 Z"
      fill="#E8829E"
      fillOpacity="0.8"
      stroke="#8E2A46"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Stitch Overlay */}
    <path
      d="M50 78 C46 74, 19 48, 19 32 C19 21, 29 14, 38 18 C44 21, 47 27, 47 27 M53 27 C53 27, 56 21, 62 18 C71 14, 81 21, 81 32 C81 48, 54 74, 50 78"
      stroke="#FFF8F3"
      strokeWidth="1.5"
      strokeDasharray={stitchDash}
      strokeLinecap="round"
    />
  </svg>
);

export const CrochetTeddy: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Left Ear */}
    <circle cx="28" cy="28" r="16" fill="#E8829E" fillOpacity="0.7" stroke="#8E2A46" strokeWidth="2" />
    <circle cx="28" cy="28" r="11" stroke="#FFF8F3" strokeWidth="1.2" strokeDasharray={stitchDash} fill="none" />
    {/* Right Ear */}
    <circle cx="72" cy="28" r="16" fill="#E8829E" fillOpacity="0.7" stroke="#8E2A46" strokeWidth="2" />
    <circle cx="72" cy="28" r="11" stroke="#FFF8F3" strokeWidth="1.2" strokeDasharray={stitchDash} fill="none" />
    
    {/* Main Head */}
    <circle cx="50" cy="55" r="32" fill="#FFF8F3" fillOpacity="0.95" stroke="#8E2A46" strokeWidth="2.5" />
    <circle cx="50" cy="55" r="27" stroke="#E8829E" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

    {/* Eyes */}
    <circle cx="38" cy="48" r="3.5" fill="#2E2420" />
    <circle cx="62" cy="48" r="3.5" fill="#2E2420" />

    {/* Snout */}
    <ellipse cx="50" cy="62" rx="12" ry="9" fill="#E8829E" fillOpacity="0.3" stroke="#8E2A46" strokeWidth="1.5" />
    <path d="M47 60 Q50 63 53 60 M50 60 L50 67" stroke="#8E2A46" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CrochetStar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Base Star */}
    <path
      d="M50 8 L63 36 L93 39 L71 60 L78 90 L50 74 L22 90 L29 60 L7 39 L37 36 Z"
      fill="#E0A93A"
      fillOpacity="0.8"
      stroke="#8E2A46"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Stitch Lines */}
    <path
      d="M50 14 L61 38 L88 41 L68 60 L74 85 L50 70 L26 85 L32 60 L12 41 L39 38 Z"
      stroke="#FFF8F3"
      strokeWidth="1.5"
      strokeDasharray={stitchDash}
      strokeLinecap="round"
    />
    {/* Center embroidery lines */}
    <path d="M50 50 L50 25 M50 50 L70 45 M50 50 L60 68 M50 50 L40 68 M50 50 L30 45" stroke="#8E2A46" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const CrochetBow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Bow Loops */}
    <path
      d="M50 50 C35 30, 15 30, 15 50 C15 70, 35 70, 50 50 Z"
      fill="#E8829E"
      fillOpacity="0.8"
      stroke="#8E2A46"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M50 50 C65 30, 85 30, 85 50 C85 70, 65 70, 50 50 Z"
      fill="#E8829E"
      fillOpacity="0.8"
      stroke="#8E2A46"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Loop stitches */}
    <path
      d="M47 50 C35 35, 20 35, 20 50 C20 65, 35 65, 47 50 M53 50 C65 35, 80 35, 80 50 C80 65, 65 65, 53 50"
      stroke="#FFF8F3"
      strokeWidth="1.2"
      strokeDasharray={stitchDash}
    />
    {/* Ribbon Tails */}
    <path
      d="M45 52 C40 65, 25 80, 20 85 C30 85, 45 75, 48 60 Z"
      fill="#E8829E"
      fillOpacity="0.8"
      stroke="#8E2A46"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M55 52 C60 65, 75 80, 80 85 C70 85, 55 75, 52 60 Z"
      fill="#E8829E"
      fillOpacity="0.8"
      stroke="#8E2A46"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Center Knot */}
    <rect x="44" y="44" width="12" height="12" rx="4" fill="#E0A93A" stroke="#8E2A46" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="3" fill="#FFF8F3" />
  </svg>
);

export const CrochetButterfly: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Left Upper Wing */}
    <path
      d="M48 50 C38 30, 15 20, 20 45 C25 60, 42 55, 48 50 Z"
      fill="#E8829E"
      fillOpacity="0.8"
      stroke="#8E2A46"
      strokeWidth="2"
    />
    <path
      d="M45 49 C37 34, 20 26, 23 45 C28 55, 40 51, 45 49 Z"
      stroke="#FFF8F3"
      strokeWidth="1"
      strokeDasharray={stitchDash}
    />
    {/* Right Upper Wing */}
    <path
      d="M52 50 C62 30, 85 20, 80 45 C75 60, 58 55, 52 50 Z"
      fill="#E8829E"
      fillOpacity="0.8"
      stroke="#8E2A46"
      strokeWidth="2"
    />
    <path
      d="M55 49 C63 34, 80 26, 77 45 C72 55, 60 51, 55 49 Z"
      stroke="#FFF8F3"
      strokeWidth="1"
      strokeDasharray={stitchDash}
    />
    {/* Left Lower Wing */}
    <path
      d="M48 52 C38 60, 22 75, 28 82 C35 88, 45 70, 48 52 Z"
      fill="#E8829E"
      fillOpacity="0.6"
      stroke="#8E2A46"
      strokeWidth="2"
    />
    {/* Right Lower Wing */}
    <path
      d="M52 52 C62 60, 78 75, 72 82 C65 88, 55 70, 52 52 Z"
      fill="#E8829E"
      fillOpacity="0.6"
      stroke="#8E2A46"
      strokeWidth="2"
    />

    {/* Butterfly Body */}
    <ellipse cx="50" cy="55" rx="3.5" ry="22" fill="#E0A93A" stroke="#8E2A46" strokeWidth="2" />
    <path d="M50 33 L50 37" stroke="#FFF8F3" strokeWidth="1" strokeDasharray="1 1" />
    {/* Antennae */}
    <path d="M48 33 Q42 22 36 24" stroke="#8E2A46" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M52 33 Q58 22 64 24" stroke="#8E2A46" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CrochetDaisy: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* 8 White Petals with dark outlines */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <path
        key={angle}
        d="M50 50 C44 32, 40 10, 50 10 C60 10, 56 32, 50 50"
        fill="#FFF8F3"
        fillOpacity="0.9"
        stroke="#8E2A46"
        strokeWidth="2"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    {/* Inner Petal Stitches */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <path
        key={`stitch-${angle}`}
        d="M50 45 L50 18"
        stroke="#E8829E"
        strokeWidth="1.2"
        strokeDasharray="2 2"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    {/* Yellow Center */}
    <circle cx="50" cy="50" r="18" fill="#E0A93A" stroke="#8E2A46" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="13" stroke="#FFF8F3" strokeWidth="1.2" strokeDasharray={stitchDash} fill="none" />
  </svg>
);

export const CrochetYarnBall: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Base Sphere */}
    <circle cx="50" cy="50" r="42" fill="#E8829E" fillOpacity="0.85" stroke="#8E2A46" strokeWidth="3" />

    {/* Wound Yarn Lines */}
    <path d="M15 50 Q50 20 85 50" stroke="#8E2A46" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
    <path d="M15 50 Q50 80 85 50" stroke="#8E2A46" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
    
    <path d="M50 15 Q20 50 50 85" stroke="#8E2A46" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
    <path d="M50 15 Q80 50 50 85" stroke="#8E2A46" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />

    {/* Diagonal cross wraps */}
    <path d="M22 22 Q50 50 78 78" stroke="#FFF8F3" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
    <path d="M78 22 Q50 50 22 78" stroke="#FFF8F3" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

    {/* Yarn End / Loose Thread tail */}
    <path
      d="M80 75 Q92 88 78 95 Q65 92 50 92"
      stroke="#E8829E"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M80 75 Q92 88 78 95 Q65 92 50 92"
      stroke="#8E2A46"
      strokeWidth="1"
      strokeDasharray="2 2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
