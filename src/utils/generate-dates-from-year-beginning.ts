import dayjs from "dayjs";

export function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf('year');
  const today = new Date();

  const dates = []
  let compareDate = firstDayOfTheYear

  /** Enquanto compareDate for menor que hoje, ele adiciona no dates
   * # O "isBefore" é uma função do dayJs
   */
  while(compareDate.isBefore(today)) {
    dates.push(compareDate);
    compareDate = compareDate.add(1, 'day');
  }

  return dates;

}