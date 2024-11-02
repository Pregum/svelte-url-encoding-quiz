<!-- TitleScreen.svelte -->
<script lang='ts'>
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let showConfirmation = false;

	function handleLevelSelect(level: string) {
		showConfirmation = true; // 確認画面を表示
	}

	function confirmSelection() {
		goto('/beginner', { replaceState: true });
	}

	function cancelSelection() {
		showConfirmation = false; // 確認画面を非表示
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-surface-100">
	<div class="title-container">
		<strong class="text-3xl font-bold uppercase text-primary">ゲームのタイトル</strong>
	</div>

	<div class="flex gap-4">
		<button class="btn btn-primary" on:click={() => handleLevelSelect('初級')}>初級</button>
		<button class="btn btn-secondary">中級</button>
		<button class="btn btn-tertiary">上級</button>
	</div>

	{#if showConfirmation}
		<div class="confirmation-overlay" transition:fly={{ y: 20, duration: 300 }}>
			<div class="confirmation-box">
				<p>初級を選択しました。よろしいですか？</p>
				<div class="button-container">
					<button class="btn btn-primary" on:click={confirmSelection}>OK</button>
					<button class="btn btn-secondary" on:click={cancelSelection}>戻る</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.confirmation-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.confirmation-box {
		background-color: #fff;
		padding: 2rem;
		border-radius: 8px;
		text-align: center;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
	}

	.button-container {
		display: flex;
		gap: 1rem;
		margin-top: 1.5rem;
		justify-content: center;
	}
</style>
