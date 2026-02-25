import { useMemo } from "react";
import { motion } from "framer-motion";

interface ResultPageProps {
  answers: string[];
}

interface NavigationResult {
  title: string;
  archetype: string;
  description: string;
  guidance: string;
  direction: string;
}

function generateResult(answers: string[]): NavigationResult {
  const traits = {
    logic: 0, intuition: 0, community: 0, patience: 0,
    ambition: 0, relationships: 0, peace: 0, freedom: 0,
    safety: 0, discovery: 0,
    driven: 0, surrender: 0, hopeful: 0, content: 0,
    clarity: 0, depth: 0, strength: 0, creativity: 0,
  };

  answers.forEach((a) => {
    if (a in traits) traits[a as keyof typeof traits]++;
  });

  // Determine archetype
  const archetypes: { check: () => boolean; result: NavigationResult }[] = [
    {
      check: () => traits.logic > 0 && traits.ambition > 0 && traits.clarity > 0,
      result: {
        title: "The Cartographer",
        archetype: "🗺️",
        description: "You chart the unknown with precision and intent. Where others see chaos, you see patterns waiting to be mapped.",
        guidance: "Your strength lies in turning complexity into clarity. Trust your analytical mind, but remember — the most beautiful discoveries happen when the map runs out.",
        direction: "North by Northeast — Toward uncharted mastery",
      },
    },
    {
      check: () => traits.intuition > 0 && traits.depth > 0,
      result: {
        title: "The Deep Diver",
        archetype: "🐋",
        description: "You descend where few dare to go. The surface world is too shallow for the truths you seek.",
        guidance: "Your emotional depth is your compass. The answers you seek aren't on the horizon — they're beneath you. Dive deeper, and trust what you find in the dark.",
        direction: "Due South — Into the depths of meaning",
      },
    },
    {
      check: () => traits.freedom > 0 && traits.discovery > 0,
      result: {
        title: "The Voyager",
        archetype: "⛵",
        description: "You were never meant for the harbor. Every horizon calls your name, and every wave is an invitation.",
        guidance: "Your restless spirit is not a flaw — it's your navigation system. Stop asking where you belong and start asking what you haven't explored yet.",
        direction: "West by Southwest — Toward the unknown edge",
      },
    },
    {
      check: () => traits.relationships > 0 && traits.community > 0,
      result: {
        title: "The Lighthouse Keeper",
        archetype: "🗼",
        description: "You are the steady light others navigate by. In the storm of life, you are the constant that guides ships home.",
        guidance: "Your purpose is found in service to others, but don't forget — even a lighthouse needs its own foundation. Shore up your own ground before illuminating the path for others.",
        direction: "East — Toward the dawn of connection",
      },
    },
    {
      check: () => traits.peace > 0 || traits.patience > 0 || traits.surrender > 0,
      result: {
        title: "The Still Water",
        archetype: "🌊",
        description: "In a world of crashing waves, you are the calm beneath the surface. Your power is not in movement — it's in presence.",
        guidance: "Stillness is not stagnation. You understand what others miss in their rush: that the tide always returns. Wait with purpose, and the current will carry you exactly where you need to be.",
        direction: "The Center — You are already where you need to be",
      },
    },
    {
      check: () => traits.creativity > 0 || traits.hopeful > 0,
      result: {
        title: "The Stormweaver",
        archetype: "⚡",
        description: "You don't flee the storm — you dance in it. Where others see destruction, you see raw material for creation.",
        guidance: "Your creative force is born from chaos. Don't try to calm the waters; instead, learn to shape the lightning. Your next masterpiece is hiding inside the next disruption.",
        direction: "All directions — You create your own compass",
      },
    },
  ];

  const matched = archetypes.find((a) => a.check());
  return matched?.result ?? {
    title: "The Drifter",
    archetype: "🌀",
    description: "You move between worlds, belonging to none and understanding all. The tide does not push you — it flows through you.",
    guidance: "Your path is not a straight line, and that is your greatest gift. Where others see indecision, you carry the wisdom of multiplicity. Every direction holds a lesson for you.",
    direction: "Everywhere and nowhere — The journey is the destination",
  };
}

const ResultPage = ({ answers }: ResultPageProps) => {
  const result = useMemo(() => generateResult(answers), [answers]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center gap-6 px-4 max-w-2xl mx-auto text-center"
    >
      <motion.div variants={itemVariants} className="text-6xl mb-2">
        {result.archetype}
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-body"
      >
        Your Navigation Result
      </motion.p>

      <motion.h1
        variants={itemVariants}
        className="font-display text-4xl md:text-5xl text-glow leading-tight"
      >
        {result.title}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="font-body text-lg text-foreground/80 leading-relaxed max-w-lg"
      >
        {result.description}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="w-full max-w-md border border-compass-gold/20 rounded-lg p-6 bg-muted/20 backdrop-blur-sm"
      >
        <p className="text-compass-gold font-display text-sm tracking-widest uppercase mb-3">
          The AI Speaks
        </p>
        <p className="font-body text-foreground/90 italic leading-relaxed">
          "{result.guidance}"
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 mt-2"
      >
        <div className="h-px w-12 bg-compass-gold/30" />
        <p className="text-compass-gold/70 font-display text-sm tracking-wider">
          {result.direction}
        </p>
        <div className="h-px w-12 bg-compass-gold/30" />
      </motion.div>

      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.reload()}
        className="mt-8 px-8 py-3 border border-compass-gold/40 rounded-lg font-body text-compass-gold hover:bg-compass-gold/10 transition-all duration-300 tracking-wider"
      >
        Navigate Again
      </motion.button>
    </motion.div>
  );
};

export default ResultPage;
