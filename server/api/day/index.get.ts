import dayjs from "dayjs";
import { z } from "zod";
import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const getDayParams = z.object({
    date: z.coerce.date(),
  });

  const query = getQuery(event);

  const { date } = getDayParams.parse(query);

  const parsedDate = dayjs(date).startOf("day");

  const weekDay = parsedDate.get("day");

  const possibleHabits = await prisma.habit.findMany({
    where: {
      created_at: {
        lte: date,
      },
      weekDays: {
        some: {
          week_day: weekDay,
        },
      },
    },
  });

  const day = await prisma.day.findUnique({
    where: {
      date: parsedDate.toDate(),
    },
    include: {
      dayHabits: true,
    },
  });

  const completedHabits =
    day?.dayHabits.map((dayHabit) => dayHabit.habit_id) ?? [];

  return { possibleHabits, completedHabits };
});
