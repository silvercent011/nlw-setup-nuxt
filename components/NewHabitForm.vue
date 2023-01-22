<template>
  <form @submit.prevent="createNewHabit" class="w-full flex flex-col mt-6">
    <label for="title" class="font-semibold leading-tight"
      >Qual seu comprometimento?</label
    >
    <input
      type="text"
      id="title"
      placeholder="Exercícios, dormir bem, etc..."
      autofocus
      class="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
      v-model="title"
    />

    <label for="" class="font-semibold leading-tight mt-4"
      >Qual a recorrência?</label
    >

    <div class="flex flex-col gap-2 mt-3">
      <div
        class="flex items-center gap-3"
        v-for="(weekDay, index) in availableWeekDays"
        :key="index"
      >
        <div>
          <input
            class="h-8 w-8 rounded-lg flex items-center justify-center bg-zing-900 border-2 bg-transparent checked:text-green-500 border-zinc-800 overflow-hidden ring-0 transition-colors"
            type="checkbox"
            :value="index"
            v-model="weekDays"
          />
        </div>
        <span class="text-white leading-tight"> {{ weekDay }} </span>
      </div>
    </div>

    <button
      type="submit"
      class="mt-6 rounded-lg p-4 flex items-center gap-3 font-semibold bg-green-600 hover:bg-green-500 justify-center transition-colors"
    >
      <PhCheck size="20" weight="bold" />
      Confirmar
    </button>
  </form>
</template>

<script setup lang="ts">
import { PhCheck } from "phosphor-vue";

const availableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

const title = ref<string>("");
const weekDays = ref<number[]>([]);

async function createNewHabit() {
  if (!title.value || weekDays.value.length === 0) {
    return;
  }

  await $fetch("/api/habits", {
    method: "POST",
    body: { title: title.value, weekDays: weekDays.value },
  }).then(() => {
    title.value = "";
    weekDays.value = [];
  });
}
</script>
