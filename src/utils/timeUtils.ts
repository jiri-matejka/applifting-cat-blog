export function timeAgo(
  historyDate: Date,
  currentDate: Date = new Date(),
): string {
  const timeDifference = currentDate.getTime() - historyDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return ago(years, 'year');
  } else if (months > 0) {
    return ago(months, 'month');
  } else if (days > 0) {
    return ago(days, 'day');
  } else if (hours > 0) {
    return ago(hours, 'hour');
  } else if (minutes > 0) {
    return ago(minutes, 'minute');
  } else {
    return seconds <= 1 ? 'just now' : ago(seconds, 'second');
  }
}

function maybePluralSuffix(value: number): string {
  return value === 1 ? '' : 's';
}

function ago(value: number, unit: string) {
  return `${value} ${unit}${maybePluralSuffix(value)} ago`;
}
