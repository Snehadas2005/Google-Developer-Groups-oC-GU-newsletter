import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TypewriterText({
  text,
  className = "",
  speed = 0.025,
}: TypewriterTextProps) {
  return (
    <p className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: i * speed,
            duration: 0.1,
            ease: "linear",
          }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  );
}

// Alternative cursor version
export function TypewriterWithCursor({
  text,
  className = "",
}: TypewriterTextProps) {
  const chars = text.split("");

  return (
    <p className={`${className} relative`}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: i * 0.025,
            duration: 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}

      {/* Blinking cursor */}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-[#2a2a2a] ml-[2px] align-middle"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          type: "tween",
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </p>
  );
}
