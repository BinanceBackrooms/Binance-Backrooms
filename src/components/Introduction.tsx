import { motion } from 'framer-motion';
import MarqueeText from './MarqueeText';

export default function Introduction() {
  return (
    <section className="relative pt-[88px]">
      <MarqueeText
        text="WELCOME TO THE BACKROOMS • NO ESCAPE • FOREVER TRADING • ALWAYS WATCHING • INFINITE LOSSES •"
        speed={50}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-gold-dimmest)] to-transparent opacity-20 pointer-events-none" />

      <div className="px-8 lg:px-12 pt-12 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl lg:text-8xl xl:text-9xl font-black text-[var(--color-gold)] leading-[0.9] tracking-tighter mb-12"
          >
            WELCOME TO THE<br />BINANCE<br />BACKROOMS
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl space-y-6 text-[var(--color-gold-dim)] leading-[1.8] text-lg"
          >
            <p>
              You have entered a space that exists between trades. A dimension where every liquidation echoes forever, where bad decisions crystallize into golden walls, and where the market never closes.
            </p>
            <p>
              This is not a typical cryptocurrency project. This is a memecoin that acknowledges the absurdity, the madness, the pure chaos of trading culture.
            </p>
          </motion.div>
        </div>
      </div>

      <MarqueeText
        text="LIQUIDATED • RUGGED • DUMPED • FOMO • PANIC SOLD • BOUGHT HIGH • SOLD LOW •"
        speed={40}
      />

      <div className="px-8 lg:px-12 py-32">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 text-[var(--color-gold-dim)] leading-[1.8] text-base"
          >
            <p>
              The Binance Backrooms is where all traders eventually end up. Some arrive after a fat-finger error. Others fall through after their hundredth margin call. A few stumble in while chasing the next 100x gem.
            </p>
            <p>
              But everyone arrives eventually. And no one truly leaves.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 text-[var(--color-gold-dim)] leading-[1.8] text-base"
          >
            <p>
              What we offer is simple: a community united by shared trading trauma, a token that acknowledges the casino, and lore that perfectly captures the existential dread of watching your portfolio bleed red.
            </p>
            <p>
              This is performance art masquerading as a financial instrument. This is group therapy disguised as speculation.
            </p>
          </motion.div>
        </div>
      </div>

      <MarqueeText
        text="THE MARKET NEVER CLOSES • ALWAYS WATCHING • NEVER SLEEPING • FOREVER TRADING •"
        reverse
        speed={35}
      />
    </section>
  );
}
