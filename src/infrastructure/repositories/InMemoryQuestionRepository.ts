// Infrastructure Layer - In-Memory Question Repository Implementation

import { IQuestionRepository } from '@domain/repositories/IQuestionRepository';
import { Question } from '@domain/entities/Question';
import { QUESTION_DATA } from '../data/QuestionData';

export class InMemoryQuestionRepository implements IQuestionRepository {
  private questions: Question[] = QUESTION_DATA;

  async getAllQuestions(): Promise<Question[]> {
    return [...this.questions];
  }

  async getRandomQuestions(count: number): Promise<Question[]> {
    const shuffled = this.shuffleArray([...this.questions]);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
