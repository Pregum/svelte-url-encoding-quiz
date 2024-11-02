import { AnswerOption } from './answerOption.ts';

export class Question {
	constructor(
		public id: string,
		public question: string,
		public options: AnswerOption[],
	) {}
}
