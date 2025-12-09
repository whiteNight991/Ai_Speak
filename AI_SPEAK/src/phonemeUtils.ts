// phonemeUtils.ts
export function textToPhonemes(text: string): string[] {
  // 실제 프로젝트에서는 한국어 자모 분리기 사용 (여기선 간단히 처리)
  const hangulBase = 0xac00;
  const cho = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];
  const jung = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
    'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
  ];

  const result: string[] = [];

  for (const ch of text) {
    const code = ch.charCodeAt(0) - hangulBase;
    if (code < 0 || code > 11171) continue;
    const choIdx = Math.floor(code / 588);
    const jungIdx = Math.floor((code % 588) / 28);
    result.push(cho[choIdx], jung[jungIdx]);
  }

  return result.filter(Boolean);
}
