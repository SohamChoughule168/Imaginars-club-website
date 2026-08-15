import React from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  label,
  title,
  description,
  align = 'center'
}: SectionHeadingProps) {
  const alignmentClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  const labelAlignClass = align === 'center' ? 'items-center' : 'items-start';

  return (
    <div className={`flex flex-col w-full ${alignmentClass} mb-12 md:mb-20`}>
      {label && (
        <div className={`flex flex-col ${labelAlignClass} mb-4 space-y-2`}>
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#7C3AED]">
            {label}
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-violet-600 to-cyan-400 rounded-full" />
        </div>
      )}
      
      <h2 className="font-space-grotesk text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
        {title}
      </h2>
      
      {description && (
        <p className="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
