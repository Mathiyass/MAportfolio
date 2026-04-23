import React from 'react';

interface SivionLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const SivionLogo: React.FC<SivionLogoProps> = ({ 
  className = "", 
  size = 40,
  showText = false 
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 80 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection Lines */}
        <path 
          d="M40 12L64 26L64 54L40 68L16 54L16 26Z" 
          stroke="#00CFB5" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        />
        
        {/* Nodes */}
        <circle cx="40" cy="12" r="4.5" fill="#00CFB5" className="animate-pulse" />
        <circle cx="64" cy="26" r="4.5" fill="#00CFB5" />
        <circle cx="64" cy="54" r="4.5" fill="#00CFB5" />
        <circle cx="40" cy="68" r="4.5" fill="#00CFB5" />
        <circle cx="16" cy="54" r="4.5" fill="#00CFB5" />
        <circle cx="16" cy="26" r="4.5" fill="#00CFB5" />
        
        {/* Subtle Inner Glow */}
        <circle cx="40" cy="40" r="25" fill="#00CFB5" fillOpacity="0.05" />
      </svg>
      
      {showText && (
        <span className="font-display text-2xl font-black tracking-tighter text-white uppercase">
          SIVION
        </span>
      )}
    </div>
  );
};
