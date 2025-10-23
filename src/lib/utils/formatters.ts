export function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  
  const units = ['K', 'M', 'B', 'T'];
  let unitIndex = -1;
  let scaledNum = num;
  
  while (scaledNum >= 1000 && unitIndex < units.length - 1) {
    scaledNum /= 1000;
    unitIndex++;
  }
  
  return `${scaledNum.toFixed(1)}${units[unitIndex]}`;
}

export function formatScore(score: number): string {
  const isNegative = score < 0;
  const absScore = Math.abs(score);
  
  if (absScore < 1000) {
    return score.toString();
  }
  
  const formatted = (absScore / 1000).toFixed(1) + 'k';
  return isNegative ? `-${formatted}` : formatted;
}

export function formatCommentCount(count: number): string {
  if (count === 0) return 'No comments';
  if (count === 1) return '1 comment';
  if (count < 1000) return `${count} comments`;
  return `${formatNumber(count)} comments`;
}

export function formatPercentage(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}

export function formatSubscribers(count: number): string {
  if (count === 1) return '1 subscriber';
  return `${formatNumber(count)} subscribers`;
}

export function formatDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, '');
  } catch {
    return url;
  }
}