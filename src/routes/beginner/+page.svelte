<script lang="ts">
	import {
		startCountdown,
		startTimer,
		countdown,
		gameStarted,
		timeLeft
	} from '../../model/gameLogic';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Card from './../../components/Card.svelte';
	import CardContainer from '../../components/CardContainer.svelte';
	import { QuestionGenerator } from '../../model/questionGenerator';
	import { AnswerOption } from '../../model/AnswerOption';
	import type { Question } from '../../model/question';

	const encodedCharacters = ' !"#$%&\'()*+,/:;<=>?@[\\]^`{|}';
	const generator = new QuestionGenerator(encodedCharacters);
	let question: Question | undefined;

	onMount(() => {
		startCountdown(() => {
			startTimer();
			question = generator.generateOptions();
		});
	});
	// 表示する問題の内容
	let questionTitle = '%デコード後の文字を回答してください';
	$: answerOptions = question?.options;

	function handleOnClick(option: AnswerOption): void {
		option.isCorrect ? console.log('正解') : console.log('不正解');
		question = generator.generateOptions();
	}
</script>

<div class="grid gap-4">
	{#if $gameStarted}
		<ProgressBar value={$timeLeft} max={30} class="flex flex-auto" />

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
	{:else}
		<p>カウントダウン: {$countdown}</p>
	{/if}
</div>

<style>
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
