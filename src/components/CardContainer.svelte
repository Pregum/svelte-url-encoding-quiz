<script lang="ts">
	import Card from '../components/Card.svelte';
	let cards: Card[] = [];
</script>

<div class="flex flex-wrap justify-center gap-4">
	<slot />
</div>
