// Presentation Layer - Game Screen Component

import { Star, Timer, Lightbulb, Award } from 'lucide-react';
import { GameState } from '@domain/entities/GameState';
import { ShuffledQuestion } from '@domain/entities/Question';
import { AnswerFeedback } from '@domain/valueObjects/AnswerResult';

interface GameScreenProps {
  gameState: GameState;
  currentQuestion: ShuffledQuestion;
  feedback: AnswerFeedback | null;
  progress: number;
  onAnswer: (option: string) => void;
  onUseHint: () => void;
}

export const GameScreen = ({
  gameState,
  currentQuestion,
  feedback,
  progress,
  onAnswer,
  onUseHint,
}: GameScreenProps) => {
  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-stone-100 flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden relative border-b-4 border-emerald-700">
        
        {/* Header */}
        <div className="bg-emerald-700 p-4 sm:p-5 md:p-6 text-white flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-emerald-600 p-1.5 sm:p-2 rounded-lg">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
            </div>
            <span className="text-xl sm:text-2xl font-black">{gameState.score}</span>
          </div>

          <div className={`flex items-center gap-1.5 sm:gap-2 text-xl sm:text-2xl font-mono font-bold ${
            gameState.timeLeft < 7 ? 'text-red-400 animate-pulse' : 'text-emerald-100'
          }`}>
            <Timer size={20} className="sm:w-6 sm:h-6" /> {gameState.timeLeft}s
          </div>

          <div className="text-right">
            <span className="text-[10px] sm:text-xs font-bold opacity-70 block uppercase">Streak</span>
            <span className="text-lg sm:text-xl font-black text-yellow-400">x{gameState.streak}</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full mb-6 sm:mb-8">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-700" 
              style={{ width: `${progress}%` }} 
            />
          </div>

          {/* Question */}
          <div className="mb-6 sm:mb-8 md:mb-10 text-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col items-center justify-center">
            <span className="px-3 sm:px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] sm:text-xs font-bold uppercase mb-3 sm:mb-4 tracking-widest">
              {currentQuestion.type}
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-gray-900 leading-snug px-2">
              "{currentQuestion.riddle}"
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentQuestion.shuffledOptions.map((option: string, idx: number) => {
              const isCorrect = feedback && option === currentQuestion.answer;
              const isDisabled = gameState.disabledOptions.includes(option);

              let btnClass = "p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-base sm:text-lg font-bold transition-all flex justify-between items-center touch-manipulation ";
              
              if (feedback) {
                if (isCorrect) {
                  btnClass += "bg-emerald-50 border-emerald-500 text-emerald-700 ";
                } else {
                  btnClass += "bg-gray-50 border-gray-100 text-gray-200 ";
                }
              } else if (isDisabled) {
                btnClass += "bg-gray-50 border-gray-50 text-gray-200 cursor-not-allowed opacity-40 ";
              } else {
                btnClass += "bg-white border-stone-200 text-gray-800 hover:border-emerald-600 hover:shadow-md active:scale-95 ";
              }

              return (
                <button
                  key={idx}
                  disabled={!!feedback || isDisabled}
                  onClick={() => onAnswer(option)}
                  className={btnClass}
                >
                  <span className="text-left">{option}</span>
                  {isCorrect && <Award className="text-emerald-600 flex-shrink-0" size={20} />}
                </button>
              );
            })}
          </div>

          {/* Hint Section */}
          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 border-t pt-4 sm:pt-6">
            <button 
              onClick={onUseHint}
              disabled={gameState.hintUsed || !!feedback}
              className={`flex items-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider px-4 py-2 rounded-xl transition-all touch-manipulation ${
                gameState.hintUsed || !!feedback 
                  ? 'text-gray-300' 
                  : 'text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100'
              }`}
            >
              <Lightbulb size={18} />
              <span className="hidden sm:inline">{gameState.hintUsed ? "Kidokezo kimetumika" : "Omba Kidokezo"}</span>
              <span className="sm:hidden">{gameState.hintUsed ? "Imetumika" : "Kidokezo"}</span>
            </button>
            
            <div className="text-gray-400 font-bold text-sm italic">
              {gameState.currentQuestionIndex + 1} / {gameState.totalQuestions}
            </div>
          </div>

          {gameState.hintUsed && !feedback && (
            <div className="mt-4 p-3 sm:p-4 bg-emerald-50 rounded-xl sm:rounded-2xl text-emerald-900 text-xs sm:text-sm font-medium border-l-4 border-emerald-500">
              <b>Kidokezo:</b> {currentQuestion.hint}
            </div>
          )}
        </div>

        {/* Feedback Overlay */}
        {feedback && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px] pointer-events-none">
            <div className={`p-6 sm:p-8 rounded-full font-black text-4xl sm:text-5xl md:text-6xl shadow-2xl animate-in zoom-in duration-200 ${
              feedback === 'correct' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {feedback === 'correct' ? 'VEMA!' : 'SIO!'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
