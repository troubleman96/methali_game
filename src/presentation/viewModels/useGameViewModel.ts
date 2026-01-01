// Presentation Layer - Game View Model Hook
// Manages all game state and coordinates with use cases

import { useState, useEffect, useCallback } from 'react';
import { GameState, createInitialGameState } from '@domain/entities/GameState';
import { ShuffledQuestion } from '@domain/entities/Question';
import { LeaderboardEntry } from '@domain/entities/Score';
import { AnswerFeedback } from '@domain/valueObjects/AnswerResult';
import { StartGameUseCase } from '@application/useCases/StartGameUseCase';
import { AnswerQuestionUseCase } from '@application/useCases/AnswerQuestionUseCase';
import { UseHintUseCase } from '@application/useCases/UseHintUseCase';
import { SaveScoreUseCase } from '@application/useCases/SaveScoreUseCase';
import { GetLeaderboardUseCase } from '@application/useCases/GetLeaderboardUseCase';
import { GameRules } from '@domain/services/GameRules';

interface UseGameViewModelProps {
  startGameUseCase: StartGameUseCase;
  answerQuestionUseCase: AnswerQuestionUseCase;
  useHintUseCase: UseHintUseCase;
  saveScoreUseCase: SaveScoreUseCase;
  getLeaderboardUseCase: GetLeaderboardUseCase;
}

export const useGameViewModel = ({
  startGameUseCase,
  answerQuestionUseCase,
  useHintUseCase,
  saveScoreUseCase,
  getLeaderboardUseCase,
}: UseGameViewModelProps) => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard on mount
  useEffect(() => {
    const loadLeaderboard = async () => {
      const entries = await getLeaderboardUseCase.execute(5);
      setLeaderboard(entries);
    };
    loadLeaderboard();
  }, [getLeaderboardUseCase]);

  // Timer countdown
  useEffect(() => {
    if (gameState.status !== 'PLAYING' || feedback || gameState.timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeLeft: prev.timeLeft - 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.status, gameState.timeLeft, feedback]);

  // Handle timeout
  useEffect(() => {
    if (gameState.status === 'PLAYING' && gameState.timeLeft === 0 && !feedback) {
      handleAnswer(null, true);
    }
  }, [gameState.timeLeft, gameState.status, feedback]);

  const startGame = useCallback(async () => {
    const gameQuestions = await startGameUseCase.execute(20);
    setQuestions(gameQuestions);
    setGameState({
      ...createInitialGameState(),
      status: 'PLAYING',
      timeLeft: GameRules.getInitialTime(),
    });
    setFeedback(null);
  }, [startGameUseCase]);

  const handleAnswer = useCallback(
    (selectedOption: string | null, isTimeout: boolean = false) => {
      if (feedback) return;

      const currentQuestion = questions[gameState.currentQuestionIndex];
      
      const result = answerQuestionUseCase.execute({
        selectedOption,
        correctAnswer: currentQuestion.answer,
        timeRemaining: gameState.timeLeft,
        currentStreak: gameState.streak,
        hintUsed: gameState.hintUsed,
        isTimeout,
      });

      setFeedback(result.feedback);
      setGameState(prev => ({
        ...prev,
        score: prev.score + result.pointsEarned,
        streak: result.newStreak,
      }));

      setTimeout(() => {
        if (gameState.currentQuestionIndex < questions.length - 1) {
          setGameState(prev => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
            timeLeft: GameRules.getInitialTime(),
            hintUsed: false,
            disabledOptions: [],
          }));
          setFeedback(null);
        } else {
          finishGame(gameState.score + result.pointsEarned);
        }
      }, 1800);
    },
    [feedback, questions, gameState, answerQuestionUseCase]
  );

  const handleUseHint = useCallback(() => {
    if (gameState.hintUsed || feedback) return;

    const currentQuestion = questions[gameState.currentQuestionIndex];
    const result = useHintUseCase.execute({
      availableOptions: currentQuestion.shuffledOptions,
      correctAnswer: currentQuestion.answer,
    });

    setGameState(prev => ({
      ...prev,
      hintUsed: true,
      disabledOptions: result.disabledOptions,
    }));
  }, [gameState, questions, feedback, useHintUseCase]);

  const finishGame = useCallback(
    async (finalScore: number) => {
      setGameState(prev => ({
        ...prev,
        status: 'FINISHED',
        score: finalScore,
      }));

      const updatedLeaderboard = await saveScoreUseCase.execute(finalScore);
      setLeaderboard(updatedLeaderboard);
    },
    [saveScoreUseCase]
  );

  const resetToStart = useCallback(() => {
    setGameState(createInitialGameState());
    setFeedback(null);
  }, []);

  const currentQuestion = questions[gameState.currentQuestionIndex];
  const progress = questions.length > 0 
    ? ((gameState.currentQuestionIndex + 1) / questions.length) * 100 
    : 0;

  return {
    gameState,
    currentQuestion,
    questions,
    feedback,
    leaderboard,
    progress,
    startGame,
    handleAnswer,
    handleUseHint,
    resetToStart,
  };
};
