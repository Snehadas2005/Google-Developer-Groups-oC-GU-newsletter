import { motion } from 'framer-motion';

interface MastheadProps {
  issueNumber?: string;
  date: string;
}

export function Masthead({ issueNumber = '001', date }: MastheadProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="border-b-2 border-[#2a2a2a] pb-8 mb-12 px-20"
    >
      {/* Top decorative line */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-[1px] bg-[#e0ddd6]" />
        <span className="text-[10px] uppercase tracking-widest text-[#6a6a6a]">
          Issue No. {issueNumber}
        </span>
        <div className="flex-1 h-[1px] bg-[#e0ddd6]" />
      </div>

      {/* Main title */}
      <div className="text-center">
        <h1 className="font-['Playfair_Display'] text-7xl font-bold tracking-tight text-[#2a2a2a] mb-2">
          GDG on Campus
        </h1>
        <p className="font-['Libre_Baskerville'] text-2xl text-[#6a6a6a] italic mb-4">
          Weekly Chronicle
        </p>
        
        {/* Date and location */}
        <div className="flex items-center justify-center gap-6 text-xs uppercase tracking-wider text-[#6a6a6a]">
          <span>{date}</span>
          <span className="text-[#e0ddd6]">•</span>
          <span>University Edition</span>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-[#2a2a2a]"
            style={{
              transform: `rotate(45deg)`
            }}
          />
        ))}
      </div>
    </motion.header>
  );
}