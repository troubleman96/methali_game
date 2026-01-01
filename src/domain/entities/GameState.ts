// Domain Layer - Game State Entity

export type GameStatus = 'START' | 'PLAYING' | 'FINISHED';

export interface GameState {
  readonly status: GameStatus;
  readonly currentQuestionIndex: number;
  readonly score: number;
  readonly streak: number;
  readonly timeLeft: number;
  readonly hintUsed: boolean;
  readonly disabledOptions: readonly string[];
  readonly totalQuestions: number;
}

export const createInitialGameState = (): GameState => ({
  status: 'START',
  currentQuestionIndex: 0,
  score: 0,
  streak: 0,
  timeLeft: 25,
  hintUsed: false,
  disabledOptions: [],
  totalQuestions: 20,
});
