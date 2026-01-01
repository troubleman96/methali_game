// Infrastructure Layer - LocalStorage Score Repository Implementation

import { IScoreRepository } from '@domain/repositories/IScoreRepository';
import { Score, LeaderboardEntry } from '@domain/entities/Score';

export class LocalStorageScoreRepository implements IScoreRepository {
  private readonly STORAGE_KEY = 'swahili_riddle_v2_scores';

  async saveScore(score: Score): Promise<void> {
    const existingScores = await this.getAllScores();
    const updatedScores = [...existingScores, score];
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedScores));
  }

  async getLeaderboard(limit: number): Promise<LeaderboardEntry[]> {
    const scores = await this.getAllScores();
    
    const sortedScores = scores
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);
    
    return sortedScores.map((score, index) => ({
      ...score,
      rank: index + 1,
    }));
  }

  private async getAllScores(): Promise<Score[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    
    if (!stored) {
      return [];
    }
    
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
}
