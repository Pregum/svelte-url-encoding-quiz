import { AnswerOption } from './answerOption';

export class Question {
	constructor(
		public id: string,
		public question: string,
		public options: AnswerOption[],
	) {}
}
