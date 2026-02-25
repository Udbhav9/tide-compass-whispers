import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  text: string;
  subtitle: string;
  options: { label: string; value: string; direction: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "When uncertainty rises, what do you reach for?",
    subtitle: "The tide reveals your anchor.",
    options: [
      { label: "Logic & Reason", value: "logic", direction: 0 },
      { label: "Intuition & Gut Feeling", value: "intuition", direction: 90 },
      { label: "The Advice of Others", value: "community", direction: 180 },
      { label: "Stillness & Patience", value: "patience", direction: 270 },
    ],
  },
  {
    id: 2,
    text: "A storm approaches. What do you protect first?",
    subtitle: "Your priorities shape the current.",
    options: [
      { label: "My Ambitions", value: "ambition", direction: 45 },
      { label: "My Relationships", value: "relationships", direction: 135 },
      { label: "My Inner Peace", value: "peace", direction: 225 },
      { label: "My Freedom", value: "freedom", direction: 315 },
    ],
  },
  {
    id: 3,
    text: "The compass offers two paths. Which calls to you?",
    subtitle: "Not all who wander are lost.",
    options: [
      { label: "The Known Shore — Safety", value: "safety", direction: 0 },
      { label: "The Open Sea — Discovery", value: "discovery", direction: 180 },
    ],
  },
  {
    id: 4,
    text: "What does the tide whisper to you at night?",
    subtitle: "Listen closely to the deep.",
    options: [
      { label: "\"You are not enough yet.\"", value: "driven", direction: 30 },
      { label: "\"Let go of control.\"", value: "surrender", direction: 120 },
      { label: "\"The best is yet to come.\"", value: "hopeful", direction: 210 },
      { label: "\"You already have everything.\"", value: "content", direction: 300 },
    ],
  },
  {
    id: 5,
    text: "If the ocean could grant one gift, what would it be?",
    subtitle: "The final offering shapes your course.",
    options: [
      { label: "Clarity of Vision", value: "clarity", direction: 0 },
      { label: "Depth of Feeling", value: "depth", direction: 90 },
      { label: "Strength of Will", value: "strength", direction: 180 },
      { label: "Boundless Creativity", value: "creativity", direction: 270 },
    ],
  },
];

interface QuestionFlowProps {
  onAnswer: (questionId: number, value: string, direction: number) => void;
  onComplete: (answers: string[]) => void;
  currentQuestion: number;
}

const QuestionFlow = ({ onAnswer, onComplete, currentQuestion }: QuestionFlowProps) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const question = questions[currentQuestion];
  if (!question) return null;

  const handleSelect = (option: (typeof question.options)[0]) => {
    setSelectedOption(option.value);
    onAnswer(question.id, option.value, option.direction);

    const newAnswers = [...answers, option.value];

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestion >= questions.length - 1) {
        onComplete(newAnswers);
      } else {
        setAnswers(newAnswers);
      }
    }, 800);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 px-4 max-w-2xl mx-auto"
      >
        {/* Progress */}
        <div className="flex gap-2 mb-4">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-8 rounded-full transition-all duration-500 ${
                i < currentQuestion
                  ? "bg-compass-gold"
                  : i === currentQuestion
                  ? "bg-compass-gold/60"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <div className="text-center space-y-3">
          <p className="text-muted-foreground text-sm tracking-widest uppercase font-body">
            {question.subtitle}
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-foreground text-glow leading-relaxed">
            {question.text}
          </h2>
        </div>

        {/* Options */}
        <div className="grid gap-3 w-full mt-4">
          {question.options.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option)}
              disabled={selectedOption !== null}
              className={`group relative text-left px-6 py-4 rounded-lg border transition-all duration-500 font-body text-base md:text-lg
                ${
                  selectedOption === option.value
                    ? "border-compass-gold bg-compass-gold/10 text-compass-gold"
                    : selectedOption !== null
                    ? "border-border/30 text-muted-foreground opacity-40"
                    : "border-border/50 text-foreground hover:border-compass-gold/50 hover:bg-muted/30"
                }
              `}
            >
              <span className="relative z-10">{option.label}</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-compass-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionFlow;
export { questions };
