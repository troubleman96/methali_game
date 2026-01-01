// Domain Layer - Question Repository Interface
// This defines the contract for data access without implementation details

import { Question } from '../entities/Question';

export interface IQuestionRepository {
  getAllQuestions(): Promise<Question[]>;
  getRandomQuestions(count: number): Promise<Question[]>;
}
