import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OceanBackground from "@/components/OceanBackground";
import Compass from "@/components/Compass";
import QuestionFlow from "@/components/QuestionFlow";
import ResultPage from "@/components/ResultPage";

type Phase = "intro" | "questions" | "result";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [oceanIntensity, setOceanIntensity] = useState<"calm" | "moderate" | "stormy">("calm");
  const [compassRotation, setCompassRotation] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [compassVisible, setCompassVisible] = useState(false);

  // Intro sequence
  const [introStep, setIntroStep] = useState(0);

  const startJourney = useCallback(() => {
    setCompassVisible(true);
    setIntroStep(1);
    setTimeout(() => setIntroStep(2), 1500);
    setTimeout(() => {
      setPhase("questions");
      setOceanIntensity("moderate");
    }, 3500);
  }, []);

  const handleAnswer = useCallback((_qId: number, value: string, direction: number) => {
    setCompassRotation(direction);
    setAnswers((prev) => [...prev, value]);
    // Increase intensity as questions progress
    if (currentQuestion >= 2) setOceanIntensity("stormy");
  }, [currentQuestion]);

  const handleQuestionNext = useCallback(() => {
    setCurrentQuestion((prev) => prev + 1);
  }, []);

  const handleComplete = useCallback((finalAnswers: string[]) => {
    setAnswers(finalAnswers);
    setOceanIntensity("calm");
    setCompassRotation(0);
    setTimeout(() => setPhase("result"), 500);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <OceanBackground intensity={oceanIntensity} />

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-6 px-4 text-center"
          >
            {introStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex flex-col items-center gap-8"
              >
                <p className="text-muted-foreground text-sm tracking-[0.4em] uppercase font-body">
                  🌊 AI That Predicts Your Life's Direction
                </p>
                <h1 className="font-display text-5xl md:text-7xl text-glow leading-tight">
                  The Tide<br />Navigator
                </h1>
                <p className="font-body text-foreground/60 text-lg max-w-md leading-relaxed">
                  The ocean knows where you're going.<br />
                  Will you listen?
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startJourney}
                  className="mt-4 px-10 py-4 border border-compass-gold/50 rounded-lg font-display text-compass-gold tracking-widest text-sm hover:bg-compass-gold/10 transition-all duration-300 uppercase"
                >
                  Begin Navigation
                </motion.button>
              </motion.div>
            )}

            {introStep >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <Compass rotation={45} visible={compassVisible} pulsing />
                {introStep >= 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-body text-compass-gold/80 text-lg italic max-w-md"
                  >
                    "The tide is shifting. Choose your direction wisely."
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {phase === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center gap-8 w-full"
          >
            <div className="animate-float mb-4">
              <Compass rotation={compassRotation} visible pulsing={false} />
            </div>
            <QuestionFlow
              currentQuestion={currentQuestion}
              onAnswer={(qId, value, direction) => {
                handleAnswer(qId, value, direction);
                setTimeout(() => handleQuestionNext(), 800);
              }}
              onComplete={handleComplete}
            />
          </motion.div>
        )}

        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <ResultPage answers={answers} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
