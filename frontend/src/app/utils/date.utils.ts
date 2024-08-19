function localDate(): string[] {
  const localDateTime = new Date();
  const utcDateTime = new Date(
    localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
  );
  return utcDateTime.toISOString().split('.')[0].split('T');
}

export function today(): string {
  return localDate()[0];
}

export function now(): string {
  return localDate()[1];
}
