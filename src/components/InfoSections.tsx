import { motion } from 'framer-motion';
import CollapsibleSection from './CollapsibleSection';
import MarqueeText from './MarqueeText';

export default function InfoSections() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <CollapsibleSection title="What is This Place" defaultOpen={false}>
        <div className="space-y-6 text-[var(--color-gold-dim)] leading-[1.7] text-base">
          <p>
            The Backrooms are a well-documented internet phenomenon describing endless liminal spaces that exist outside normal reality. The Binance Backrooms take this concept and transplant it directly into cryptocurrency culture.
          </p>
          <p>
            Here, the fluorescent-lit hallways are replaced with trading terminals. The humming machinery is replaced with the constant ping of liquidation notifications. The sense of being lost is replaced with the feeling of watching your stop-loss get hunted for the fifteenth time this week.
          </p>
          <p>
            This project exists as a meta-commentary on crypto trading itself. The endless grinding. The false hope. The communities that form around shared financial suffering. We are satirizing it. We are celebrating it. We are trapped in it.
          </p>
        </div>
        </CollapsibleSection>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <CollapsibleSection title="Why Does This Exist">
        <div className="space-y-6 text-[var(--color-gold-dim)] leading-[1.7] text-base">
          <p>
            Because someone had to do it. Because the intersection of Backrooms lore and crypto degeneracy is too perfect to ignore. Because every trader has felt like they are trapped in a nightmare dimension where the market is always against them.
          </p>
          <p>
            This is not a serious investment opportunity. This is not financial advice. This is barely even a cryptocurrency project. What this is, fundamentally, is an art piece about the psychological toll of participating in speculative markets.
          </p>
          <p>
            But also it is a memecoin. And memecoins do not need justification. They simply exist. They spread. They consume. Like the Backrooms themselves.
          </p>
        </div>
        </CollapsibleSection>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CollapsibleSection title="The Token">
        <div className="space-y-6 text-[var(--color-gold-dim)] leading-[1.7] text-base">
          <p>
            The Binance Backrooms token is your key to the community. Holding it does not grant you special access. It does not provide utility. It does not promise returns.
          </p>
          <p>
            What it does is signal that you understand. You have been in the trenches. You have felt the despair of a rugged project. You have experienced the hope of a moon mission that never came. You have lost money on coins with animal names and anime profile pictures.
          </p>
          <p>
            You are a survivor of the crypto Backrooms. And this token is your badge of honor. Or shame. The line between the two is blurry here.
          </p>
        </div>
        </CollapsibleSection>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <CollapsibleSection title="Community Culture">
        <div className="space-y-6 text-[var(--color-gold-dim)] leading-[1.7] text-base">
          <p>
            The Binance Backrooms community is built on shared understanding of crypto absurdism. We do not take ourselves seriously. We do not pretend this is changing the world. We acknowledge that all of this is fundamentally ridiculous.
          </p>
          <p>
            Our culture revolves around creating lore. Writing stories. Generating increasingly unhinged scenarios about trading in impossible dimensions. Every community member contributes to the mythos. Every holder adds to the archive.
          </p>
          <p>
            We are building a collaborative fiction that happens to have a speculative token attached to it. Or we are building a speculative token that happens to have collaborative fiction attached to it. The distinction does not matter.
          </p>
        </div>
        </CollapsibleSection>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <CollapsibleSection title="How to Participate">
        <div className="space-y-6 text-[var(--color-gold-dim)] leading-[1.7] text-base">
          <p>
            Participation is simple. Acquire the token through whatever means are available. Join the community channels. Read the archive files. Contribute your own stories of trading trauma.
          </p>
          <p>
            Share memes. Create art. Write lore. The Binance Backrooms grow stronger with each contribution. The walls pulse with every new piece of content. The dimension expands with every holder.
          </p>
          <p>
            There is no formal structure. There is no leadership hierarchy. There is only the collective descent into beautiful, golden madness.
          </p>
        </div>
        </CollapsibleSection>
      </motion.div>

      <div className="mt-20">
        <MarqueeText
          text="ENTER THE BACKROOMS • JOIN THE MADNESS • EMBRACE THE CHAOS • TRADE FOREVER •"
          speed={45}
        />
      </div>
    </section>
  );
}
