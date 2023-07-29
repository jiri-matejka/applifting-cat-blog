import { timeAgo } from './timeUtils';

describe('timeAgo function', () => {
  it('returns the correct time ago string', () => {
    const now = new Date();

    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    expect(timeAgo(oneMinuteAgo, now)).toBe('1 minute ago');
    expect(timeAgo(twoHoursAgo, now)).toBe('2 hours ago');
    expect(timeAgo(fiveDaysAgo, now)).toBe('5 days ago');
    expect(timeAgo(now, now)).toBe('just now');
  });
});
