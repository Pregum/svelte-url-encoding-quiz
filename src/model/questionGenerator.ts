import { AnswerOption } from './answerOption.ts';
import { percentEncode } from './encodingLogic.ts';
import { Question } from './question.ts';

import { v4 as uuidv4 } from 'uuid';
export class QuestionGenerator {
	constructor(
		public originalQuestionSeeds: string // この問題の元となる文字列
	) {}

	/**
	 * 6つの選択肢を生成し、ランダムに1つを正解としてマークするメソッド
	 * @returns AnswerOptionの配列
	 */
	generateOptions(): Question {
		// originalQuestionSeedsからランダムに1つ選ぶ

		const options: AnswerOption[] = [];
		for (let i = 0; i < 6; i++) {
			const seed =
				this.originalQuestionSeeds[Math.floor(Math.random() * this.originalQuestionSeeds.length)];
			const encodedString = percentEncode(seed);
			options.push(new AnswerOption(i, encodedString, false));
		}

		// ランダムに1つの選択肢を正解としてマーク
		const correctIndex = Math.floor(Math.random() * options.length);
		options[correctIndex].isCorrect = true;

		const uuid = uuidv4();
		console.log('uuid:', uuid);

		const question = new Question(uuid, options[correctIndex].text, options);

		return question;
	}
}
