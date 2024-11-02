<!-- TitleScreen.svelte -->
<script lang="ts">
  function handleLevelSelect(level: string) {
    alert(`Selected Level: ${level}`);
    // レベル選択後の処理をここに記述します
  }
</script>

<style>
  /* Skeletonのユーティリティクラスでスタイルを管理するため、独自のCSSは最小限に */
  .title-container {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>

<div class="flex flex-col items-center justify-center min-h-screen bg-surface-100">
  <div class="title-container">
    <strong class="text-3xl font-bold uppercase text-primary">ゲームのタイトル</strong>
  </div>

  <div class="flex gap-4">
    <button class="btn btn-primary" on:click={() => handleLevelSelect('初級1')}>初級</button>
    <button class="btn btn-secondary" on:click={() => handleLevelSelect('中級')}>中級</button>
    <button class="btn btn-tertiary" on:click={() => handleLevelSelect('上級')}>上級</button>
  </div>
</div>