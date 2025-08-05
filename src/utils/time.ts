export const MINUTES_MILLIS = 60 * 1000;

export const formatSingleDate = (date: Date | undefined) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatWeekRange = (date: Date | undefined) => {
  if (!date) return "";
  const curr = new Date(date);
  const day = curr.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(curr);
  monday.setDate(curr.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
  });

  const start = formatter.format(monday);
  const end = formatter.format(sunday);

  return `Week from ${start} to ${end}`;
};
