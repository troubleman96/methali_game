// Domain Layer - Business Rules and Calculations

import { AnswerResult, AnswerFeedback } from '../valueObjects/AnswerResult';

export class GameRules {
  private static readonly BASE_POINTS = 15;
  private static readonly HINT_PENALTY_POINTS = 10;
  private static readonly TIME_BONUS_MULTIPLIER = 1;
  private static readonly INITIAL_TIME_SECONDS = 25;

  static calculatePoints(
    timeRemaining: number,
    streak: number,
    hintUsed: boolean
  ): number {
    const basePoints = hintUsed 
      ? this.BASE_POINTS - this.HINT_PENALTY_POINTS 
      : this.BASE_POINTS;
    
    const timeBonus = timeRemaining * this.TIME_BONUS_MULTIPLIER;
    const streakMultiplier = streak + 1;
    
    return (basePoints + timeBonus) * streakMultiplier;
  }

  static evaluateAnswer(
    selectedOption: string | null,
    correctAnswer: string,
    timeRemaining: number,
    currentStreak: number,
    hintUsed: boolean,
    isTimeout: boolean = false
  ): AnswerResult {
    const isCorrect = selectedOption === correctAnswer;
    
    let feedback: AnswerFeedback;
    if (isTimeout) {
      feedback = 'timeout';
    } else if (isCorrect) {
      feedback = 'correct';
    } else {
      feedback = 'wrong';
    }

    const pointsEarned = isCorrect 
      ? this.calculatePoints(timeRemaining, currentStreak, hintUsed)
      : 0;

    const newStreak = isCorrect ? currentStreak + 1 : 0;

    return {
      isCorrect,
      pointsEarned,
      newStreak,
      feedback,
    };
  }

  static getInitialTime(): number {
    return this.INITIAL_TIME_SECONDS;
  }

  static getHintDisabledCount(): number {
    return 2;
  }
}
