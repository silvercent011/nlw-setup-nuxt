<template>
  <HeadlessPopover
    class="relative focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
  >
    <HeadlessPopoverButton
      class="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors"
      :class="{
        'bg-violet-500 border-violet-400': completedPercentage >= 80,
        'bg-violet-600 border-violet-500':
          completedPercentage >= 60 && completedPercentage < 80,
        'bg-violet-700 border-violet-600':
          completedPercentage >= 40 && completedPercentage < 60,
        'bg-violet-600 border-violet-600':
          completedPercentage >= 20 && completedPercentage < 40,
        'bg-violet-900 border-violet-700':
          completedPercentage > 0 && completedPercentage < 20,
        'bg-zinc-900 border-zinc-800': completedPercentage === 0,
      }"
    />
    <HeadlessPopoverPanel
      v-if="date"
      class="absolute z-10 min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col"
    >
      <span class="font-semibols text-zinc-400">{{ dayOfTheWeek }}</span>
      <span class="mt-1 font-extrabold leading-tight text-3xl">{{
        dayAndMonth
      }}</span>

      <ProgressBar :progress="completedPercentage" />

      <HabitsList :date="date" :onCompletedChange="handleCompletedChanged" />
    </HeadlessPopoverPanel>
  </HeadlessPopover>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

interface HabitDayProps {
  date?: Date & any;
  defaultCompleted?: number;
  amount?: number;
}

const props = withDefaults(defineProps<HabitDayProps>(), {
  defaultCompleted: 0,
  amount: 0,
});

const completed = ref<number>(props.defaultCompleted);

const completedPercentage = computed(() => {
  const percentage =
    props.amount > 0 ? Math.round((completed.value / props.amount) * 100) : 0;
  return percentage;
});

const dayAndMonth = computed(() => {
  return dayjs(props.date).format("DD/MM");
});

const dayOfTheWeek = computed(() => {
  return dayjs(props.date).format("dddd");
});

function handleCompletedChanged(completedCount: number) {
  completed.value = completedCount;
}
</script>
