<script lang="ts">
	import {
		startCountdown,
		startTimer,
		countdown,
		gameStarted,
		timeLeft,
		timeUp
	} from '../../model/gameLogic';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Card from './../../components/Card.svelte';
	import CardContainer from '../../components/CardContainer.svelte';
	import { QuestionGenerator } from '../../model/questionGenerator';
	import { AnswerOption } from '../../model/AnswerOption';
	import type { Question } from '../../model/question';
	import { ResultManager } from '../../model/resultManager';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	// import type { title } from 'process';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();

	const toastStore = getToastStore();

	const encodedCharacters = ' !"#$%&\'()*+,/:;<=>?@[\\]^`{|}';
	const generator = new QuestionGenerator(encodedCharacters);
	let question: Question | undefined;
	// ResultManagerのインスタンスを作成
	const resultManager = new ResultManager();

	onMount(() => {
		startCountdown(() => {
			// カウントダウン終了時の処理
			startTimer(() => {
				// 終了時のイベント
				gameStarted.set(false);
			});
			question = generator.generateOptions();
		});
	});
	// 表示する問題の内容
	let questionTitle = '%デコード後の文字を選択してください';
	$: answerOptions = question?.options;
	let correctCount = writable(0);
	let incorrectCount = writable(0);

	function handleOnClick(option: AnswerOption): void {
		if (option.isCorrect) {
			// resultManager.registerCorrect();
			console.log(`正解 -- ${resultManager.getCorrectCount()}`);
			// correctCount.update((n) => n + 1);
			handleCorrectAnswer();
		} else {
			console.log(`不正解 -- ${resultManager.getIncorrectCount()}`);
			// resultManager.registerIncorrect();
			//incorrectCount.update((n) => n + 1);
			handleIncorrectAnswer();
		}

		question = generator.generateOptions();
	}
	// 正解メッセージを表示するフラグ
	let showCorrectMessage = writable(false);
	let showIncorrectMessage = writable(false);

	// 正解を登録し、正解メッセージをフェードイン
	function handleCorrectAnswer() {
		resultManager.registerCorrect();
		correctCount.update((n) => n + 1);
		// showCorrectMessage.set(true);
		// setTimeout(() => showCorrectMessage.set(false), 2000); // 2秒後にフェードアウト
		const t: ToastSettings = {
			message: '正解',
			timeout: 750,
			background: 'variant-filled-success',
			hideDismiss: true,
		};
		toastStore.trigger(t);
	}

	function handleIncorrectAnswer() {
		resultManager.registerIncorrect();
		incorrectCount.update((n) => n + 1);
		// showIncorrectMessage.set(true);
		// setTimeout(() => showIncorrectMessage.set(false), 2000); // 2秒後にフェードアウト

		const t: ToastSettings = {
			message: '不正解',
			timeout: 750,
			background: 'variant-filled-error',
			hideDismiss: true,
		};

		toastStore.trigger(t);
	}
</script>

<Toast />
<div class="gap-4 grid full-screen">
	{#if !$gameStarted && !$timeUp}
		<p>カウントダウン: {$countdown}</p>
	{/if}

	{#if $timeUp}
		<p class="grid grid-rows-2 mt-4 text-8xl">終了</p>
		<button class="btn btn-primary" on:click={() => location.reload()}>もう一度</button>
		<button class="btn btn-secondary" on:click={() => (location.href = '/')}>トップへ</button>
	{/if}

	{#if $gameStarted}
		<ProgressBar value={$timeLeft} max={30} class="grid" />
		<div class="grid grid-cols-2">
			<p>正解: {$correctCount}</p>
			<p>不正解: {$incorrectCount}</p>
		</div>

		<!-- 正解時のフェードインアニメーション -->
		{#if $showCorrectMessage}
			<div class="correct-message" transition:fade>正解！</div>
		{/if}
		{#if $showIncorrectMessage}
			<!-- <div class="in-correct-message" transition:fade>不正解！</div> -->
			<!-- <Toast >test</Toast> -->
		{/if}

		<!-- 問題表示エリア -->
		<div class="question-area mb-8 flex-col flex">
			<p class="text-3xl">{questionTitle}</p>
			<p class="text-8xl my-8">{question?.question ?? ''}</p>
		</div>

		<div class="flex items-center justify-center m-20">
			<CardContainer>
				{#each answerOptions ?? [] as option, i}
					<Card
						on:click={() => handleOnClick(option)}
						title={option.answer}
						number={i + 1}
						content=""
					/>
				{/each}
			</CardContainer>
		</div>

		<div class="timer">{timeLeft}秒</div>
	{/if}
</div>

<style>
	.correct-message {
		position: absolute;
		top: 20px;
		right: 20px;
		padding: 1rem;
		background-color: #4caf50;
		color: #fff;
		border-radius: 4px;
		font-weight: bold;
		text-align: center;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
		z-index: 1000; /* 他の要素より前面に表示 */
	}
	.in-correct-message {
		position: absolute;
		top: 20px;
		right: 20px;
		padding: 1rem;
		background-color: #ed6b6b;
		color: #fff;
		border-radius: 4px;
		font-weight: bold;
		text-align: center;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
		z-index: 1000; /* 他の要素より前面に表示 */
	}
	.full-screen {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.timer {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: rgba(0, 0, 0, 0.7);
		color: #fff;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 1rem;
	}
	.question-area {
		background-color: #f0f0f0;
		padding: 1rem;
		border-radius: 8px;
		text-align: center;
		font-size: 1.2rem;
		font-weight: bold;
		color: #333;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	}
</style>
