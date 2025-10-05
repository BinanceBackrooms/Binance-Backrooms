interface MarqueeTextProps {
  text: string;
  reverse?: boolean;
  speed?: number;
}

export default function MarqueeText({ text, reverse = false, speed = 30 }: MarqueeTextProps) {
  const direction = reverse ? 'reverse' : 'normal';

  return (
    <div className="overflow-hidden whitespace-nowrap py-8">
      <div
        className="inline-block animate-marquee"
        style={{
          animationDirection: direction,
          animationDuration: `${speed}s`,
        }}
      >
        <span className="inline-block px-4">{text}</span>
        <span className="inline-block px-4">{text}</span>
        <span className="inline-block px-4">{text}</span>
        <span className="inline-block px-4">{text}</span>
      </div>
    </div>
  );
}
