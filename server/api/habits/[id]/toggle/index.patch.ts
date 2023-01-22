import dayjs from "dayjs";
import { z } from "zod";
import { prisma } from "../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);

  const toggleHabitParams = z.object({
    id: z.string().uuid(),
  });

  const { id } = toggleHabitParams.parse(params);

  const today = dayjs().startOf("day").toDate();

  let day = await prisma.day.findUnique({
    where: {
      date: today,
    },
  });

  if (!day) {
    day = await prisma.day.create({
      data: {
        date: today,
      },
    });
  }

  const dayHabit = await prisma.dayHabit.findUnique({
    where: {
      day_id_habit_id: {
        day_id: day.id,
        habit_id: id,
      },
    },
  });

  if (dayHabit) {
    await prisma.dayHabit.delete({
      where: {
        id: dayHabit.id,
      },
    });
  } else {
    await prisma.dayHabit.create({
      data: {
        day_id: day.id,
        habit_id: id,
      },
    });
  }

  return {};
});
