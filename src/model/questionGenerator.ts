import { AnswerOption } from './AnswerOption.ts';
import { percentEncode, splitIntoChunks } from './encodingLogic.ts';

export class QuestionGenerator {
	constructor(
		public question: string,
		public originalQuestionSeeds: string[] // この問題の元となる文字列
	) {}

	/**
	 * 6つの選択肢を生成し、ランダムに1つを正解としてマークするメソッド
	 * @returns AnswerOptionの配列
	 */
	generateOptions(): AnswerOption[] {
		// originalQuestionSeedsからランダムに1つ選ぶ
		const seed =
			this.originalQuestionSeeds[Math.floor(Math.random() * this.originalQuestionSeeds.length)];

		// 選ばれたseedをパーセントエンコーディングし、6文字ごとのチャンクに分割
		const encodedString = percentEncode(seed);
		const chunks = splitIntoChunks(encodedString, 6);

		// 選択肢として6つのチャンクを使用
		const options: AnswerOption[] = [];
		for (let i = 0; i < 6; i++) {
			options.push(new AnswerOption(i, chunks[i] || '', false));
		}

		// ランダムに1つの選択肢を正解としてマーク
		const correctIndex = Math.floor(Math.random() * options.length);
		options[correctIndex].isCorrect = true;

		return options;
	}
}
