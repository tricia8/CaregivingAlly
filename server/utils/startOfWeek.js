export async function startOfWeekUTC(date) {
  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth();
  const utcDate = date.getUTCDate();

  const utcDay = date.getUTCDay();

  const diff = utcDay === 0 ? -6 : 1 - utcDay;

  return new Date(Date.UTC(utcYear, utcMonth, utcDate + diff));
}
