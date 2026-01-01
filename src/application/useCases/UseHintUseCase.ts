// Application Layer - Use Hint Use Case
// Handles the business logic for using a hint

import { GameRules } from '@domain/services/GameRules';

export interface UseHintInput {
  availableOptions: readonly string[];
  correctAnswer: string;
}

export interface UseHintOutput {
  disabledOptions: string[];
}

export class UseHintUseCase {
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  execute(input: UseHintInput): UseHintOutput {
    const wrongOptions = input.availableOptions.filter(
      option => option !== input.correctAnswer
    );
    
    const disableCount = GameRules.getHintDisabledCount();
    const optionsToDisable = this.shuffleArray([...wrongOptions]).slice(0, disableCount);
    
    return {
      disabledOptions: optionsToDisable,
    };
  }
}
