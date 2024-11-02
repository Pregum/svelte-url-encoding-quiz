export class ResultManager {
  private correctCount: number;
  private incorrectCount: number;

  constructor() {
    this.correctCount = 0;
    this.incorrectCount = 0;
  }

  /**
   * 正解をカウント
   */
  registerCorrect() {
    this.correctCount++;
  }

  /**
   * 不正解をカウント
   */
  registerIncorrect() {
    this.incorrectCount++;
  }

  /**
   * 成績をリセット
   */
  resetResults() {
    this.correctCount = 0;
    this.incorrectCount = 0;
  }

  /**
   * 正解数を取得
   * @returns 正解の数
   */
  getCorrectCount(): number {
    return this.correctCount;
  }

  /**
   * 不正解数を取得
   * @returns 不正解の数
   */
  getIncorrectCount(): number {
    return this.incorrectCount;
  }

  /**
   * 正解率を取得
   * @returns 正解率（パーセンテージ）
   */
  getAccuracy(): number {
    const total = this.correctCount + this.incorrectCount;
    return total > 0 ? (this.correctCount / total) * 100 : 0;
  }

  /**
   * 合計回答数を取得
   * @returns 合計回答数
   */
  getTotalCount(): number {
    return this.correctCount + this.incorrectCount;
  }
}