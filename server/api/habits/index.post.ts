import dayjs from "dayjs";
import { z } from "zod";
import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const createHabitBody = z.object({
    title: z.string(),
    weekDays: z.array(z.number().min(0).max(6)),
  });

  const body = await readBody(event);

  const { title, weekDays } = createHabitBody.parse(body);

  const today = dayjs().startOf("day").toDate();

  await prisma.habit.create({
    data: {
      title,
      created_at: today,
      weekDays: {
        create: weekDays.map((weekDay) => {
          return { week_day: weekDay };
        }),
      },
    },
  });

  return {};
});
