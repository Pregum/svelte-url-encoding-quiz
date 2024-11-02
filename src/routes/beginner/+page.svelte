<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let countdown = writable(3);
	let gameStarted = writable(false);

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

{#if $gameStarted}
	<ProgressBar value={timeLeft} max={30} />
	<div class="cards">
		{#each Array(6) as _, i}
			<div class="card">{i + 1}</div>
		{/each}
	</div>

	<div class="timer">{timeLeft}秒</div>
{:else}
	<p>カウントダウン: {$countdown}</p>
{/if}

<style>
	.cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 20px;
	}
	.card {
		width: 100px;
		height: 150px;
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		margin: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
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
</style>
