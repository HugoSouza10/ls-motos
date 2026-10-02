import dayjs from "dayjs";
import "server-only";

export interface DayTotalRevenueDto {
  day: string;
  totalRevenue: number;
}

export const getLast14DaysRevenue = async (): Promise<DayTotalRevenueDto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const today = dayjs().endOf("day").toDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );
  // TODO: o schema atual não define venda nem uma regra de receita.
  return last14Days.map((day) => {
    return {
      day: day.format("DD/MM"),
      totalRevenue: 0,
    };
  });
};
