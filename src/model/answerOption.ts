export class AnswerOption {
  constructor(
    public id: number,
    public answer: string,
    public rawAnswer: string,
    public isCorrect: boolean
  ) {}
}
