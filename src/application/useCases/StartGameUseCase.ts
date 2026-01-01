// Application Layer - Start Game Use Case
// Orchestrates the initialization of a new game

import { IQuestionRepository } from '@domain/repositories/IQuestionRepository';
import { ShuffledQuestion } from '@domain/entities/Question';

export class StartGameUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  private shuffleArray<T>(array: readonly T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async execute(questionCount: number = 20): Promise<ShuffledQuestion[]> {
    const questions = await this.questionRepository.getRandomQuestions(questionCount);
    
    // Shuffle options for each question
    return questions.map(question => ({
      ...question,
      shuffledOptions: this.shuffleArray(question.options),
    }));
  }
}
