<template>
  <div class="h-3 rounded-xl bg-zinc-700 w-full mt-4">
    <div
      role="progressbar"
      aria-label="Progresso de hábitos completados nesse dia"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
      class="h-3 rounded-xl bg-violet-600 transition-all"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ progress: number }>();
</script>
