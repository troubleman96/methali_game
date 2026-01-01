// Domain Layer - Core Business Entities
// These represent the core business concepts and rules

export type QuestionType = 'Kitendawili' | 'Methali';

export interface Question {
  readonly id: string;
  readonly type: QuestionType;
  readonly riddle: string;
  readonly options: readonly string[];
  readonly answer: string;
  readonly hint: string;
}

export interface ShuffledQuestion extends Question {
  readonly shuffledOptions: readonly string[];
}
