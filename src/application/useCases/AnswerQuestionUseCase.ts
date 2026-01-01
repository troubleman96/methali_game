// Application Layer - Answer Question Use Case
// Handles the business logic when a user answers a question

import { GameRules } from '@domain/services/GameRules';
import { AnswerResult } from '@domain/valueObjects/AnswerResult';

export interface AnswerQuestionInput {
  selectedOption: string | null;
  correctAnswer: string;
  timeRemaining: number;
  currentStreak: number;
  hintUsed: boolean;
  isTimeout?: boolean;
}

export class AnswerQuestionUseCase {
  execute(input: AnswerQuestionInput): AnswerResult {
    return GameRules.evaluateAnswer(
      input.selectedOption,
      input.correctAnswer,
      input.timeRemaining,
      input.currentStreak,
      input.hintUsed,
      input.isTimeout || false
    );
  }
}
