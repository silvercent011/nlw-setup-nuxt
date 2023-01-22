<template>
  <div v-if="habitsInfo" class="mt-6 flex flex-col gap-3">
    <div
      v-for="habit in habitsInfo.possibleHabits"
      class="flex items-center gap-3"
    >
      <div>
        <input
          class="h-8 w-8 rounded-lg flex items-center justify-center bg-zing-900 border-2 bg-transparent checked:text-green-500 border-zinc-800 overflow-hidden ring-0"
          type="checkbox"
          true-value="yes"
          false-value="no"
          :checked="habitsInfo.completedHabits.includes(habit.id)"
          :disabled="isDateInPast"
          @change="handleToggleHabit(habit.id)"
        />
      </div>
      <span
        class="font-semibold text-xl text-white leading-tight"
        :class="{
          'line-through text-white/50': habitsInfo.completedHabits.includes(
            habit.id
          ),
        }"
      >
        {{ habit.title }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Habit } from ".prisma/client";
import dayjs from "dayjs";

interface HabitsListProps {
  date: Date;
  onCompletedChange: (completedCount: number) => void;
}

interface HabitsInfo {
  possibleHabits: Habit[];
  completedHabits: string[];
}

const props = defineProps<HabitsListProps>();

const { pending, data: habitsInfo } = await useFetch<HabitsInfo & any>(
  "/api/day",
  {
    params: { date: props.date.toISOString() },
  }
);

const isDateInPast = computed(() => {
  return dayjs(props.date).endOf("day").isBefore(new Date());
});

async function handleToggleHabit(habitId: string) {
  const isHabitAlreadyCompleted =
    habitsInfo.value?.completedHabits.includes(habitId);

  await useFetch(`/api/habits/${habitId}/toggle`, { method: "PATCH" });

  let completedHabits: string[] = [];

  if (isHabitAlreadyCompleted) {
    completedHabits = habitsInfo.value!.completedHabits.filter(
      (id: string) => id !== habitId
    );
  } else {
    completedHabits = [...habitsInfo.value!.completedHabits, habitId];
  }

  habitsInfo.value = {
    possibleHabits: habitsInfo.value!.possibleHabits,
    completedHabits,
  };

  props.onCompletedChange(completedHabits.length);
}
</script>
