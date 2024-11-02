<!-- components/Card.svelte -->
<script>
	export let title = 'Default Title';
	export let content = 'This is a card content.';
	export let number = 1; // 数字を表示するためのプロパティ
</script>

<div class="p-8 flex">
	<div class="card btn flex flex-col">
		<!-- 数字を表示するバッジ -->
		<div class="number-badge select-none">{number}</div>

		<!-- カードの内容 -->
		<div class="card-title select-none">{title}</div>
		<div class='select-none'>{content}</div>
	</div>
</div>

<style>
	.card {
		position: relative;
		padding: 1rem;
		/* background-color: #fff; */
		border: 1px solid #19f386;
		border-radius: 8px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.number-badge {
		position: absolute;
		top: -10px;
		left: -10px;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ff6b6b; /* 円の背景色 */
		/* color: white; */
		border-radius: 50%;
		font-size: 1rem;
		font-weight: bold;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
	}

	.card-title {
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}
</style>
