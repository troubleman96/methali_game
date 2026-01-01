// Domain Layer - Answer Result Value Object

export type AnswerFeedback = 'correct' | 'wrong' | 'timeout';

export interface AnswerResult {
  readonly isCorrect: boolean;
  readonly pointsEarned: number;
  readonly newStreak: number;
  readonly feedback: AnswerFeedback;
}
