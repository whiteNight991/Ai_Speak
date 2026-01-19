// analyzer.ts
import { PHONEME_MOUTH_MAP } from './phonemeMap';
import { textToPhonemes } from './phonemeUtils';
import { AnalysisResult } from './types';
import { MouthFrame } from './faceMesh';

export class Analyzer {
  analyze(targetText: string, mouthSequence: MouthFrame[]): AnalysisResult {
    const phonemes = textToPhonemes(targetText);
    if (!phonemes.length || !mouthSequence.length) {
      return {
        accuracy: 0,
        originalText: targetText,
        recognizedText: '',
        feedback: '입모양 데이터 부족',
      };
    }

    // 기대 입모양 시퀀스
    const expected = phonemes.map(p => PHONEME_MOUTH_MAP[p]).filter(Boolean);

    // 실제 시퀀스 샘플링 (길이 맞추기)
    const ratio = mouthSequence.length / expected.length;
    const actual: MouthFrame[] = [];
    for (let i = 0; i < expected.length; i++) {
      const idx = Math.min(mouthSequence.length - 1, Math.round(i * ratio));
      actual.push(mouthSequence[idx]);
    }

    // 두 시퀀스 차이 계산
    let totalDiff = 0;
    for (let i = 0; i < expected.length; i++) {
      const e = expected[i];
      const a = actual[i] || actual[actual.length - 1];
      const diff = Math.abs(e.openness - a.openness) * 0.6 + Math.abs(e.roundness - a.roundness) * 0.4;
      totalDiff += diff;
    }

    const avgDiff = totalDiff / expected.length;
    const accuracy = Math.max(0, Math.min(100, (1 - avgDiff) * 100));

    return {
      accuracy,
      originalText: targetText,
      recognizedText: targetText,
      feedback:
        accuracy > 85
          ? '입모양이 매우 정확합니다!'
          : accuracy > 60
          ? '좋아요, 조금만 더 연습해보세요!'
          : '입모양이 많이 다릅니다. 천천히 다시 따라해보세요.',
    };
  }
}
