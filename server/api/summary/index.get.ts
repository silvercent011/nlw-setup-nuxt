import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const summary = await prisma.$queryRaw`
        SELECT 
            D.id, 
            D.date,
            (
                SELECT
                    cast(count(*) as double precision)
                FROM day_habits DH
                WHERE DH.day_id = D.id
            ) as completed,
            (
                SELECT
                    cast(count(*) as double precision)
                FROM habit_week_days HWD
                INNER JOIN habits H ON H.id = HWD.habit_id
                WHERE
                    HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                    AND h.created_at <= D.date
            ) as amount
        FROM days D
    `;

  return summary;
});
