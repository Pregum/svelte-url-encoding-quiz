<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Card from './../../components/Card.svelte';
	import CardContainer from '../../components/CardContainer.svelte';

	let countdown = writable(3);
	// let gameStarted = writable(false);
	let gameStarted = writable(true); // TODO: デバッグよう、後で消す

	onMount(() => {
		const interval = setInterval(() => {
			countdown.update((n) => {
				if (n > 1) {
					return n - 1;
				} else {
					clearInterval(interval);
					// gameStarted.set(true);
					setTimeout(() => {
						gameStarted.set(true);
					}, 1000);
					return 0;
				}
			});
		}, 1000);
	});

	// タイマー
	let timeLeft = 30; // 制限時間（秒）
	let timer: NodeJS.Timeout;

	onMount(() => {
		// 1秒ごとに残り時間を減らす
		timer = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft -= 0.1; // 0.1秒ごとに減らす
			} else {
				clearInterval(timer); // 時間切れでタイマーを停止
			}
		}, 100);
	});

	// クリーンアップ
	$: if (timeLeft === 0) clearInterval(timer);
</script>

<div class="grid grid-cols-3 gap-4">
	{#if $gameStarted}
		<ProgressBar value={timeLeft} max={30} class="flex flex-auto" />
		<div class="flex items-center justify-center m-20">
			<CardContainer>
				{#each Array(6) as _, i}
					<Card title={(i + 1).toString()} number={i + 1} content="This is a card content." />
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
</style>
