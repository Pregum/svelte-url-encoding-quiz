import { AnswerOption } from './AnswerOption.ts';

export class Question {
	constructor(
		public id: number,
		public question: string,
		public options: AnswerOption[],
		public correctOption: number
	) {}
}
