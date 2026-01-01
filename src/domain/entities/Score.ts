// Domain Layer - Score Entity

export interface Score {
  readonly points: number;
  readonly date: string;
}

export interface LeaderboardEntry extends Score {
  readonly rank: number;
}
