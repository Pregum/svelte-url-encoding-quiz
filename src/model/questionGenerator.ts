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
		const usedIndices = new Set<number>();

		while (options.length < 6) {
			const randomIndex = Math.floor(Math.random() * this.originalQuestionSeeds.length);
			if (!usedIndices.has(randomIndex)) {
				usedIndices.add(randomIndex);
				const seed = this.originalQuestionSeeds[randomIndex];
				// const encodedString = encodeURIComponent(seed);
				// percentEncode ではエンコードされない文字をエンコードする
				const customEncodedString = this.customEncodeURIComponent(seed);

				options.push(new AnswerOption(options.length, seed, customEncodedString, false));
			}
		}

		// ランダムに1つの選択肢を正解としてマーク
		const correctIndex = Math.floor(Math.random() * options.length);
		options[correctIndex].isCorrect = true;

		const uuid = uuidv4();
		console.log('uuid:', uuid);

		const question = new Question(uuid, options[correctIndex].rawAnswer, options);

		return question;
	}

	/**
	 * 指定した文字列をパーセントエンコーディングする関数
	 * @param str - エンコードする文字列
	 * @returns
	 */
	customEncodeURIComponent(str: string): string {
		return encodeURIComponent(str).replace(
			/[!'()*]/g,
			(char) => '%' + char.charCodeAt(0).toString(16).toUpperCase()
		);
	}
}
