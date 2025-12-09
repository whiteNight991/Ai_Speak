"use strict";
// ============================================
// Interfaces and Types
// ============================================
// ============================================
// Viseme Analyzer Class
// ============================================
class VisemeAnalyzer {
    constructor() {
        this.koreanVisemes = [
            {
                id: 'V_SILENT',
                phonemes: [''],
                lipHeight: 0.0,
                lipWidth: 0.0,
                description: '입 다문 상태'
            },
            {
                id: 'V_AA',
                phonemes: ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ'],
                lipHeight: 0.7,
                lipWidth: 0.5,
                description: '입을 크게 벌린 상태'
            },
            {
                id: 'V_EE',
                phonemes: ['ㅣ', 'ㅔ', 'ㅖ'],
                lipHeight: 0.3,
                lipWidth: 0.8,
                description: '입을 옆으로 벌린 상태'
            },
            {
                id: 'V_OO',
                phonemes: ['ㅜ', 'ㅗ', 'ㅠ', 'ㅛ'],
                lipHeight: 0.4,
                lipWidth: 0.3,
                description: '입술을 오므린 상태'
            },
            {
                id: 'V_UH',
                phonemes: ['ㅓ', 'ㅕ', 'ㅡ'],
                lipHeight: 0.4,
                lipWidth: 0.5,
                description: '입을 중간 정도 벌린 상태'
            },
            {
                id: 'V_MM',
                phonemes: ['ㅁ', 'ㅂ', 'ㅍ'],
                lipHeight: 0.0,
                lipWidth: 0.4,
                description: '입술을 다문 상태'
            },
            {
                id: 'V_SS',
                phonemes: ['ㅅ', 'ㅆ', 'ㅈ', 'ㅉ', 'ㅊ'],
                lipHeight: 0.2,
                lipWidth: 0.6,
                description: '치아를 드러낸 상태'
            },
            {
                id: 'V_NN',
                phonemes: ['ㄴ', 'ㅇ'],
                lipHeight: 0.3,
                lipWidth: 0.5,
                description: '입을 약간 벌린 상태'
            },
            {
                id: 'V_RR',
                phonemes: ['ㄹ'],
                lipHeight: 0.3,
                lipWidth: 0.5,
                description: '혀를 말아올린 상태'
            },
            {
                id: 'V_KK',
                phonemes: ['ㄱ', 'ㄲ', 'ㅋ'],
                lipHeight: 0.3,
                lipWidth: 0.5,
                description: '목구멍 소리'
            },
            {
                id: 'V_TT',
                phonemes: ['ㄷ', 'ㄸ', 'ㅌ'],
                lipHeight: 0.3,
                lipWidth: 0.4,
                description: '혀를 윗니에 댄 상태'
            },
            {
                id: 'V_HH',
                phonemes: ['ㅎ'],
                lipHeight: 0.4,
                lipWidth: 0.5,
                description: '입을 벌리고 숨을 내쉬는 상태'
            }
        ];
        this.englishVisemes = [
            {
                id: 'V_SILENT',
                phonemes: [''],
                lipHeight: 0.0,
                lipWidth: 0.0,
                description: 'Closed mouth'
            },
            {
                id: 'V_AA',
                phonemes: ['AA', 'AE', 'AH', 'AO'],
                lipHeight: 0.7,
                lipWidth: 0.5,
                description: 'Wide open mouth'
            },
            {
                id: 'V_EE',
                phonemes: ['IY', 'IH', 'EY', 'EH'],
                lipHeight: 0.3,
                lipWidth: 0.8,
                description: 'Spread lips'
            },
            {
                id: 'V_OO',
                phonemes: ['UW', 'UH', 'OW'],
                lipHeight: 0.4,
                lipWidth: 0.3,
                description: 'Rounded lips'
            },
            {
                id: 'V_MM',
                phonemes: ['M', 'B', 'P'],
                lipHeight: 0.0,
                lipWidth: 0.4,
                description: 'Lips together'
            },
            {
                id: 'V_FF',
                phonemes: ['F', 'V'],
                lipHeight: 0.2,
                lipWidth: 0.5,
                description: 'Lower lip to upper teeth'
            },
            {
                id: 'V_TH',
                phonemes: ['TH', 'DH'],
                lipHeight: 0.3,
                lipWidth: 0.4,
                description: 'Tongue between teeth'
            },
            {
                id: 'V_SS',
                phonemes: ['S', 'Z', 'SH', 'ZH'],
                lipHeight: 0.2,
                lipWidth: 0.6,
                description: 'Teeth showing'
            },
            {
                id: 'V_NN',
                phonemes: ['N', 'NG'],
                lipHeight: 0.3,
                lipWidth: 0.5,
                description: 'Mouth slightly open'
            },
            {
                id: 'V_RR',
                phonemes: ['R', 'L'],
                lipHeight: 0.3,
                lipWidth: 0.5,
                description: 'Tongue curled up'
            },
            {
                id: 'V_KK',
                phonemes: ['K', 'G'],
                lipHeight: 0.3,
                lipWidth: 0.5,
                description: 'Back of tongue raised'
            },
            {
                id: 'V_TT',
                phonemes: ['T', 'D'],
                lipHeight: 0.3,
                lipWidth: 0.4,
                description: 'Tongue to upper teeth'
            }
        ];
    }
    extractLipFeatures(landmarks) {
        const upperLipTop = landmarks[13];
        const upperLipBottom = landmarks[14];
        const lowerLipTop = landmarks[78];
        const lowerLipBottom = landmarks[308];
        const lipLeft = landmarks[61];
        const lipRight = landmarks[291];
        const lipHeight = this.calculateDistance(upperLipTop, lowerLipBottom);
        const lipWidth = this.calculateDistance(lipLeft, lipRight);
        const upperLipThickness = this.calculateDistance(upperLipTop, upperLipBottom);
        const lowerLipThickness = this.calculateDistance(lowerLipTop, lowerLipBottom);
        const mouthOpenness = this.calculateDistance(upperLipBottom, lowerLipTop);
        const normalizedHeight = Math.min(lipHeight / 0.1, 1.0);
        const normalizedWidth = Math.min(lipWidth / 0.15, 1.0);
        const normalizedOpenness = Math.min(mouthOpenness / 0.08, 1.0);
        return {
            lipHeight: normalizedHeight,
            lipWidth: normalizedWidth,
            upperLipThickness,
            lowerLipThickness,
            mouthOpenness: normalizedOpenness,
            timestamp: Date.now()
        };
    }
    calculateDistance(point1, point2) {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        const dz = (point1.z || 0) - (point2.z || 0);
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    classifyViseme(features, language) {
        const visemeDB = language === 'ko' ? this.koreanVisemes : this.englishVisemes;
        let bestMatch = null;
        let bestScore = -Infinity;
        for (const viseme of visemeDB) {
            const heightDiff = Math.abs(features.lipHeight - viseme.lipHeight);
            const widthDiff = Math.abs(features.lipWidth - viseme.lipWidth);
            const opennessDiff = Math.abs(features.mouthOpenness - viseme.lipHeight);
            const score = 1.0 - (heightDiff * 0.5 + widthDiff * 0.3 + opennessDiff * 0.2);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = viseme;
            }
        }
        return {
            viseme: bestMatch,
            confidence: bestScore,
            features
        };
    }
    getVisemeDatabase(language) {
        return language === 'ko' ? this.koreanVisemes : this.englishVisemes;
    }
}
// ============================================
// Phoneme-Viseme Mapper Class
// ============================================
// class PhonemeVisemeMapper {
//     private visemeAnalyzer: VisemeAnalyzer;
//     constructor(visemeAnalyzer: VisemeAnalyzer) {
//         this.visemeAnalyzer = visemeAnalyzer;
//     }
//     public textToPhonemes(text: string, language: 'ko' | 'en'): Phoneme[] {
//         if (language === 'ko') {
//             return this.koreanTextToPhonemes(text);
//         } else {
//             return this.englishTextToPhonemes(text);
//         }
//     }
//     private koreanTextToPhonemes(text: string): Phoneme[] {
//         const phonemes: Phoneme[] = [];
//         const HANGUL_BASE = 0xAC00;
//         const CHOSUNG = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
//         const JUNGSUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
//         const JONGSUNG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
//         for (const char of text) {
//             const code = char.charCodeAt(0);
//             if (code >= HANGUL_BASE && code <= HANGUL_BASE + 11171) {
//                 const hangulCode = code - HANGUL_BASE;
//                 const chosungIndex = Math.floor(hangulCode / 588);
//                 const jungsungIndex = Math.floor((hangulCode % 588) / 28);
//                 const jongsungIndex = hangulCode % 28;
//                 phonemes.push({
//                     symbol: CHOSUNG[chosungIndex],
//                     duration: 100,
//                     timestamp: phonemes.length * 100
//                 });
//                 phonemes.push({
//                     symbol: JUNGSUNG[jungsungIndex],
//                     duration: 150,
//                     timestamp: phonemes.length * 100
//                 });
//                 if (jongsungIndex > 0) {
//                     phonemes.push({
//                         symbol: JONGSUNG[jongsungIndex],
//                         duration: 100,
//                         timestamp: phonemes.length * 100
//                     });
//                 }
//             } else if (char === ' ') {
//                 phonemes.push({
//                     symbol: '',
//                     duration: 200,
//                     timestamp: phonemes.length * 100
//                 });
//             }
//         }
//         return phonemes;
//     }
//     private englishTextToPhonemes(text: string): Phoneme[] {
//         const phonemes: Phoneme[] = [];
//         const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
//         for (const word of words) {
//             const chars = word.split('');
//             for (const char of chars) {
//                 phonemes.push({
//                     symbol: char.toUpperCase(),
//                     duration: 100,
//                     timestamp: phonemes.length * 100
//                 });
//             }
//             phonemes.push({
//                 symbol: '',
//                 duration: 200,
//                 timestamp: phonemes.length * 100
//             });
//         }
//         return phonemes;
//     }
//     public phonemeToExpectedViseme(phoneme: Phoneme, language: 'ko' | 'en'): Viseme {
//         const visemeDB = this.visemeAnalyzer.getVisemeDatabase(language);
//         for (const viseme of visemeDB) {
//             if (viseme.phonemes.includes(phoneme.symbol)) {
//                 return viseme;
//             }
//         }
//         return visemeDB[0];
//     }
// }
// ============================================
// Phoneme-Viseme Mapper Class (수정판)
// ============================================
class PhonemeVisemeMapper {
    constructor(visemeAnalyzer) {
        this.visemeAnalyzer = visemeAnalyzer;
    }
    textToPhonemes(text, language) {
        if (language === 'ko') {
            return this.koreanTextToPhonemes(text);
        }
        else {
            return this.englishTextToPhonemes(text);
        }
    }
    koreanTextToPhonemes(text) {
        const phonemes = [];
        const HANGUL_BASE = 0xAC00;
        const HANGUL_END = 0xD7A3;
        const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        const JUNGSUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
        const JONGSUNG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const code = char.charCodeAt(0);
            // 한글 음절인 경우
            if (code >= HANGUL_BASE && code <= HANGUL_END) {
                const hangulCode = code - HANGUL_BASE;
                const chosungIndex = Math.floor(hangulCode / 588);
                const jungsungIndex = Math.floor((hangulCode % 588) / 28);
                const jongsungIndex = hangulCode % 28;
                const syllable = char; // 원본 글자 저장
                // 초성
                phonemes.push({
                    symbol: CHOSUNG[chosungIndex],
                    duration: 100,
                    timestamp: phonemes.length * 100,
                    originalChar: syllable
                });
                // 중성
                phonemes.push({
                    symbol: JUNGSUNG[jungsungIndex],
                    duration: 150,
                    timestamp: phonemes.length * 100,
                    originalChar: syllable
                });
                // 종성 (있을 경우)
                if (jongsungIndex > 0) {
                    phonemes.push({
                        symbol: JONGSUNG[jongsungIndex],
                        duration: 100,
                        timestamp: phonemes.length * 100,
                        originalChar: syllable
                    });
                }
            }
            // 공백이 아닌 경우 (특수문자, 숫자 등)
            else if (char !== ' ' && char.trim() !== '') {
                phonemes.push({
                    symbol: char,
                    duration: 100,
                    timestamp: phonemes.length * 100,
                    originalChar: char
                });
            }
            // 공백은 무시 (음소로 추가하지 않음)
        }
        return phonemes;
    }
    englishTextToPhonemes(text) {
        const phonemes = [];
        // 특수문자 제거하고 소문자로 변환
        const cleanText = text.toLowerCase().replace(/[^a-z\s]/g, '');
        const words = cleanText.split(/\s+/).filter(word => word.length > 0);
        for (const word of words) {
            for (const char of word) {
                phonemes.push({
                    symbol: char.toUpperCase(),
                    duration: 100,
                    timestamp: phonemes.length * 100,
                    originalChar: char
                });
            }
        }
        return phonemes;
    }
    phonemeToExpectedViseme(phoneme, language) {
        const visemeDB = this.visemeAnalyzer.getVisemeDatabase(language);

        // 마침표(.)는 'close' 비지음으로 강제 매핑
        if (phoneme.symbol === '.') {
            const closeViseme = visemeDB.find(v => v.id === 'close');
            return closeViseme || visemeDB[0]; // 'close'가 없으면 기본값
        }

        for (const viseme of visemeDB) {
            if (viseme.phonemes.includes(phoneme.symbol)) {
                return viseme;
            }
        }
        // 매핑되는 비지음이 없으면 'neutral' 또는 첫 번째 비지음 반환
        return visemeDB.find(v => v.id === 'neutral') || visemeDB[0];
    }
}
// ============================================
// LipSync Analyzer Class (개선 버전)
// ============================================
class LipSyncAnalyzer {
    constructor() {
        this.lipDataBuffer = [];
        this.recordingStartTime = 0;
        this.visemeAnalyzer = new VisemeAnalyzer();
        this.phonemeMapper = new PhonemeVisemeMapper(this.visemeAnalyzer);
    }

    startRecording() {
        this.lipDataBuffer = [];
        this.recordingStartTime = Date.now();
    }

    captureLipData(landmarks, language) {
        const features = this.visemeAnalyzer.extractLipFeatures(landmarks);
        const classification = this.visemeAnalyzer.classifyViseme(features, language);
        this.lipDataBuffer.push(classification);
    }

    async analyzeLipSync(targetText, recognizedText, language) {
        const expectedPhonemes = this.phonemeMapper.textToPhonemes(targetText, language);
        const expectedVisemes = expectedPhonemes.map(phoneme =>
            this.phonemeMapper.phonemeToExpectedViseme(phoneme, language)
        );

        // 1️⃣ 기본 음성 정확도 계산
        const speechScore = this.calculateSpeechAccuracy(targetText, recognizedText, language);

        // 2️⃣ 개선된 입모양 점수 계산 (길이·움직임·음성 연동 포함)
        const baseLip = this.calculateLipSyncScore(expectedVisemes, this.lipDataBuffer, recognizedText, targetText);
        const adjustedLip = baseLip * (0.7 + 0.3 * (speechScore / 100)); // 오답일수록 점수 감소

        // 3️⃣ 종합 점수 계산
        const finalScore = Math.round((adjustedLip + speechScore) / 2);

        const detailedAnalysis = this.generateDetailedAnalysis(expectedVisemes, this.lipDataBuffer, expectedPhonemes);

        return {
            finalScore,
            lipSyncScore: adjustedLip,
            speechScore,
            detailedAnalysis,
            lipDataCount: this.lipDataBuffer.length,
            expectedVisemeCount: expectedVisemes.length
        };
    }

    // 개선된 입모양 점수 계산
    calculateLipSyncScore(expectedVisemes, actualVisemes, recognizedText = '', originalText = '') {
        if (actualVisemes.length === 0) return 0;

        // DTW 계산
        const dtw = this.dynamicTimeWarping(expectedVisemes, actualVisemes);
        const maxDistance = Math.max(1, expectedVisemes.length * 3.5);
        const normalized = Math.min(1, dtw / maxDistance);

        // 기본 점수 변환 (로지스틱)
        const mid = 0.35;
        const k = 8;
        let score = 1 / (1 + Math.exp(k * (normalized - mid)));
        score = Math.max(0, Math.min(1, score)) * 100;

        // ① 음성 길이 차이에 따른 감점
        if (recognizedText && originalText) {
            const lenRatio = Math.min(recognizedText.length / originalText.length, 1);
            if (lenRatio < 0.7) score *= lenRatio; // 너무 짧으면 감점
        }

        // ② 입술 움직임 다양성(variance) 검사
        const movementVar = this.calculateLipMovementVariance(actualVisemes);
        if (movementVar < 0.05) score *= 0.6; // 거의 안 움직였을 때 감점

        return Math.round(score);
    }

    // 입술 움직임 다양성 계산
    calculateLipMovementVariance(actualVisemes) {
        const heights = actualVisemes.map(v => v.features.lipHeight);
        if (heights.length < 2) return 0;
        const mean = heights.reduce((a, b) => a + b, 0) / heights.length;
        const variance = heights.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / heights.length;
        return Math.sqrt(variance);
    }
    dynamicTimeWarping(expected, actual) {
        const n = expected.length;
        const m = actual.length;
        const dtw = Array(n + 1).fill(null).map(() => Array(m + 1).fill(Infinity));
        dtw[0][0] = 0;
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                const cost = this.visemeDistance(expected[i - 1], actual[j - 1].viseme);
                dtw[i][j] = cost + Math.min(dtw[i - 1][j], dtw[i][j - 1], dtw[i - 1][j - 1]);
            }
        }
        return dtw[n][m];
    }
    visemeDistance(v1, v2) {
        if (v1.id === v2.id)
            return 0;
        const heightDiff = Math.abs(v1.lipHeight - v2.lipHeight);
        const widthDiff = Math.abs(v1.lipWidth - v2.lipWidth);
        const opennessProxyDiff = Math.abs(v1.lipHeight - v2.lipHeight);
        return heightDiff * 0.5 + widthDiff * 0.3 + opennessProxyDiff * 0.2;
    }
    calculateSpeechAccuracy(original, recognized, language) {
        const cleanOriginal = (original || '').replace(/[^\w\s가-힣]/g, '').toLowerCase().trim();
        const cleanRecognized = (recognized || '').replace(/[^\w\s가-힣]/g, '').toLowerCase().trim();
        if (!cleanRecognized)
            return 0;
        const sentenceSim = this.stringSimilarity(cleanOriginal, cleanRecognized);
        if (sentenceSim < 0.4)
            return 0;
        const originalWords = cleanOriginal.split(/\s+/).filter(Boolean);
        const recognizedWords = cleanRecognized.split(/\s+/).filter(Boolean);
        let matches = 0;
        const maxLength = Math.max(originalWords.length, recognizedWords.length) || 1;
        for (let i = 0; i < Math.min(originalWords.length, recognizedWords.length); i++) {
            if (originalWords[i] === recognizedWords[i]) {
                matches++;
            }
            else {
                const similarity = this.stringSimilarity(originalWords[i], recognizedWords[i]);
                if (similarity > 0.85) {
                    matches += similarity;
                }
            }
        }
        const wordScore = matches / maxLength;
        let phonemeScore = sentenceSim;
        if (language === 'ko') {
            const origPhs = this.phonemeMapper.textToPhonemes(cleanOriginal, 'ko').map(p => p.symbol).join('');
            const recPhs = this.phonemeMapper.textToPhonemes(cleanRecognized, 'ko').map(p => p.symbol).join('');
            phonemeScore = this.stringSimilarity(origPhs, recPhs);
            const essential = ['ㅏ', 'ㅔ', 'ㅣ', 'ㅗ', 'ㅜ'];
            const countEssential = (s) => essential.reduce((acc, v) => acc + (s.includes(v) ? 1 : 0), 0);
            const essentialOrig = countEssential(origPhs);
            const essentialRec = countEssential(recPhs);
            const essentialMatch = Math.min(essentialRec, essentialOrig) / (essentialOrig || 1);
            if (essentialMatch < 0.5) {
                return Math.round(Math.min(wordScore, phonemeScore) * 100 * 0.5);
            }
        }
        const combined = Math.min(1, wordScore * 0.5 + phonemeScore * 0.5);
        return Math.round(combined * 100);
    }
    stringSimilarity(s1, s2) {
        const longer = s1.length > s2.length ? s1 : s2;
        const shorter = s1.length > s2.length ? s2 : s1;
        if (longer.length === 0)
            return 1.0;
        const editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }
    levenshteinDistance(s1, s2) {
        const costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                }
                else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }
    // private generateDetailedAnalysis(
    //     expectedVisemes: Viseme[],
    //     actualVisemes: VisemeClassification[],
    //     phonemes: Phoneme[]
    // ): DetailedAnalysis {
    //     const errors: VisemeError[] = [];
    //     const timeline: TimelineEvent[] = [];
    //     const alignment = this.getOptimalAlignment(expectedVisemes, actualVisemes);
    //     for (let i = 0; i < alignment.length; i++) {
    //         const { expectedIndex, actualIndex, distance } = alignment[i];
    //         if (expectedIndex >= 0 && actualIndex >= 0) {
    //             const expected = expectedVisemes[expectedIndex];
    //             const actual = actualVisemes[actualIndex];
    //             timeline.push({
    //                 timestamp: actual.features.timestamp,
    //                 expectedViseme: expected.id,
    //                 actualViseme: actual.viseme.id,
    //                 confidence: actual.confidence,
    //                 isCorrect: distance < 0.3
    //             });
    //             if (distance > 0.5) {
    //                 errors.push({
    //                     position: expectedIndex,
    //                     phoneme: phonemes[expectedIndex]?.symbol || '',
    //                     expectedViseme: expected.id,
    //                     actualViseme: actual.viseme.id,
    //                     errorType: this.classifyError(expected, actual.viseme),
    //                     severity: distance > 0.8 ? 'high' : 'medium'
    //                 });
    //             }
    //         }
    //     }
    //     return {
    //         errors,
    //         timeline,
    //         totalPhonemes: phonemes.length,
    //         correctVisemes: timeline.filter(t => t.isCorrect).length,
    //         avgConfidence: actualVisemes.reduce((sum, v) => sum + v.confidence, 0) / actualVisemes.length
    //     };
    // }
     // 🔹 DTW 정렬 (기존 유지)
    getOptimalAlignment(expected, actual) {
        const n = expected.length;
        const m = actual.length;
        const dtw = Array(n + 1).fill(null).map(() => Array(m + 1).fill(Infinity));
        const path = Array(n + 1).fill(null).map(() => Array(m + 1).fill(''));
        dtw[0][0] = 0;

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                const cost = this.visemeDistance(expected[i - 1], actual[j - 1].viseme);
                const candidates = [
                    { value: dtw[i - 1][j], direction: 'up' },
                    { value: dtw[i][j - 1], direction: 'left' },
                    { value: dtw[i - 1][j - 1], direction: 'diag' }
                ];
                const min = candidates.reduce((prev, curr) => curr.value < prev.value ? curr : prev);
                dtw[i][j] = cost + min.value;
                path[i][j] = min.direction;
            }
        }

        const alignment = [];
        let i = n, j = m;
        while (i > 0 || j > 0) {
            if (i > 0 && j > 0) {
                alignment.unshift({
                    expectedIndex: i - 1,
                    actualIndex: j - 1,
                    distance: this.visemeDistance(expected[i - 1], actual[j - 1].viseme)
                });
            }
            const direction = path[i][j];
            if (direction === 'diag') { i--; j--; }
            else if (direction === 'up') { i--; }
            else { j--; }
        }
        return alignment;
    }

    // 🔹 모음 중심 상세 오류 분석
    generateDetailedAnalysis(expectedVisemes, actualVisemes, phonemes) {
        const errors = [];
        const timeline = [];
        const alignment = this.getOptimalAlignment(expectedVisemes, actualVisemes);

        for (let i = 0; i < alignment.length; i++) {
            const { expectedIndex, actualIndex, distance } = alignment[i];
            if (expectedIndex >= 0 && actualIndex >= 0 &&
                expectedIndex < expectedVisemes.length &&
                actualIndex < actualVisemes.length) {

                const expected = expectedVisemes[expectedIndex];
                const actual = actualVisemes[actualIndex];
                timeline.push({
                    timestamp: actual.features.timestamp,
                    expectedViseme: expected.id,
                    actualViseme: actual.viseme.id,
                    confidence: actual.confidence,
                    isCorrect: distance < 0.25
                });

                // 거리 기준 (0.6 이상만 오류로 간주)
                if (expectedIndex < phonemes.length) {
                    const phoneme = phonemes[expectedIndex];

                    // 특수문자/공백 제거
                    if (
                        !phoneme ||
                        !phoneme.symbol ||
                        /[.,!?;:~"'()\[\]{}…·—–‐\s\u00A0\u3000]/.test(phoneme.symbol)
                    ) continue;

                    // 🔹 모음만 분석
                    const vowelList = ['a', 'e', 'i', 'o', 'u', 'ae', 'ya', 'wa', 'we', 'wi', 'yu', 'wo', 'oe', 'eu', 'eo', 'yi'];
                    const visemeId = expected.id.toLowerCase();
                    const phonemeSymbol = phoneme.symbol.toLowerCase();
                    const isVowel = vowelList.includes(visemeId) || vowelList.some(v => phonemeSymbol.includes(v));
                    if (!isVowel) continue;

                    // 표시용 문자
                    let displayText = phoneme.symbol;
                    if (phoneme.originalChar && phoneme.originalChar !== phoneme.symbol) {
                        displayText = `${phoneme.originalChar}(${phoneme.symbol})`;
                    }

                    // ✅ distance 제한 완화 (0.4 → 0.25)
                    // ✅ 모음이면 classifyError를 무조건 실행
                    if (distance > 0.25) {
                        const feedback = this.classifyError(expected, actual.viseme);
                        if (feedback && feedback.trim() !== '') {
                            errors.push({
                                position: expectedIndex,
                                phoneme: displayText,
                                expectedViseme: expected.id,
                                actualViseme: actual.viseme.id,
                                errorType: feedback,
                                severity: distance > 0.8 ? 'high' : 'medium'
                            });
                        }
                    }
                }

            }
        }
        if (errors.length === 0 && typeof window !== 'undefined') {
            try {
                const originalText = window.originalSentence || "";   // 원문 문장
                const recognizedText = window.recognizedSentence || ""; // 인식된 문장

                if (originalText && recognizedText && originalText.trim() !== recognizedText.trim()) {
                    // 간단히 유사도 계산 (공통 글자 비율)
                    const common = [...originalText].filter(ch => recognizedText.includes(ch)).length;
                    const similarity = (common / originalText.length) * 100;

                    if (similarity < 80) {
                        errors.push({
                            position: 0,
                            phoneme: '',
                            expectedViseme: '',
                            actualViseme: '',
                            errorType: '음성 인식 결과가 원문과 일치하지 않습니다 🔎',
                            severity: 'high'
                        });
                    }
                }
            } catch (e) {
                console.warn("text comparison fallback skipped:", e);
            }
        }


        return {
            errors,
            timeline,
            totalPhonemes: phonemes.length,
            correctVisemes: timeline.filter(t => t.isCorrect).length,
            avgConfidence: actualVisemes.length > 0
                ? actualVisemes.reduce((sum, v) => sum + v.confidence, 0) / actualVisemes.length
                : 0
        };
    }

    // 🔹 발음/입모양 피드백 (세분화된 로직)
    classifyError(expected, actual) {
    if (!expected || !actual) return null;
    if (expected.id === 'close' || expected.id === 'sil') {
        return null; // 마침표/휴지음은 분석 제외
    }

    const heightDiff = Math.abs(expected.lipHeight - actual.lipHeight);
    const widthDiff = Math.abs(expected.lipWidth - actual.lipWidth);
    const visemeId = expected.id.toLowerCase();

    // ✅ 모음별 맞춤 피드백
    const vowelTips = {
        'a': { main: '입을 세로로 크게 벌려보세요 👄', less: '입이 조금 과하게 벌어졌어요. 살짝 줄여보세요 😊' },
        'i': { main: '입을 옆으로 조금 더 벌려보세요 😁', less: '입이 너무 옆으로 벌어졌어요. 살짝 오므려보세요 😗' },
        'o': { main: '입술을 앞으로 모아보세요 😗', less: '입술이 너무 오므려졌어요. 조금 펴보세요 😊' },
        'u': { main: '입술을 앞으로 모으고 살짝 내려보세요 😮', less: '입이 너무 벌어졌어요. 입술을 조금 더 모아주세요 😗' },
        'e': { main: '입을 약간만 벌리고 중간 정도로 유지하세요 ✨', less: '입이 조금 크네요. 살짝 덜 벌려보세요 🙂' },
        'ae': { main: '입을 살짝 옆으로 벌려주세요 😄', less: '입이 너무 옆으로 벌어졌어요. 중앙으로 모아보세요 😊' },
    };

    // 🔹 모음 분류
    const key = Object.keys(vowelTips).find(k => visemeId.includes(k));
    const feedbackSet = key ? vowelTips[key] : null;

    // 🔹 높이(입 벌림) 차이 우선
    if (heightDiff > 0.3 && heightDiff >= widthDiff) {
        if (expected.lipHeight > actual.lipHeight) {
            return feedbackSet ? feedbackSet.main : '입을 더 크게 벌려야 합니다';
        } else {
            return feedbackSet ? feedbackSet.less : '입을 덜 벌려야 합니다';
        }
    }

    // 🔹 폭(입 오므림/좌우 벌림)
    if (widthDiff > 0.3 && widthDiff > heightDiff) {
        if (expected.lipWidth > actual.lipWidth) {
            return feedbackSet ? feedbackSet.main : '입을 더 옆으로 벌려야 합니다';
        } else {
            return feedbackSet ? feedbackSet.less : '입술을 더 오므려야 합니다';
        }
    }

    // 🔹 미세 오차
    if (heightDiff > 0.15 || widthDiff > 0.15) {
        if (feedbackSet) return '입모양이 거의 정확하지만 ' + feedbackSet.main;
        return '입모양이 거의 정확하지만 약간 조정이 필요합니다 ✨';
    }

    return null;
}
    
}
// ============================================
// Main App State Class
// ============================================
class AppState {
    constructor() {
        this.selection = {
            language: null,
            length: null,
            category: null
        };
        this.currentSentence = '';
        this.mediaRecorder = null;
        this.videoStream = null;
        this.faceMesh = null;
        this.recognition = null;
        this.recordedChunks = [];
        this.isRecording = false;
        this.sentences = {
            ko: {
                quote: {
                    short: ['행복은 습관이다. 그것을 몸에 지녀라.', '꿈을 지녀라. 그러면 어려운 현실을 이길 수 있다.'],
                    long: ['인생은 자전거를 타는 것과 같다. 균형을 유지하려면 계속 움직여야 한다.', '성공은 최종적인 것이 아니며 실패는 치명적인 것이 아니다. 중요한 것은 계속할 수 있는 용기다.']
                },
                book: {
                    short: ['모든 것은 연습이다.', '책은 시간을 넘어 대화할 수 있게 해준다.'],
                    long: ['우리가 사랑하는 것들은 우리가 누구인지를 말해준다. 우리의 선택이 우리를 정의한다.', '인간은 자신이 생각하는 것보다 훨씬 더 많은 것을 견딜 수 있다.']
                },
                movie: {
                    short: ['인생은 초콜릿 상자와 같아.', '포기하지 마. 기적은 일어나.'],
                    long: ['과거는 아프지만 내 생각엔 과거에서 도망칠 수도 있고 과거에서 배울 수도 있어.', '두려움은 항상 존재한다. 하지만 용기는 두려움을 극복하는 것이다.']
                },
                music: {
                    short: ['음악은 영혼의 언어다.', '노래는 마음을 치유한다.'],
                    long: ['우리가 함께 부르는 노래는 우리를 하나로 만들고 희망을 주는 힘이 있다.', '멜로디는 말보다 더 깊은 감정을 전달할 수 있는 마법 같은 힘을 가지고 있다.']
                },
                news: {
                    short: ['오늘의 뉴스를 전해드립니다.', '경제가 회복세를 보이고 있습니다.'],
                    long: ['정부는 오늘 새로운 정책을 발표하며 국민들의 삶의 질 향상을 위해 노력하겠다고 밝혔습니다.', '기술 발전으로 인해 우리의 일상생활이 빠르게 변화하고 있으며 새로운 기회들이 창출되고 있습니다.']
                },
                sns: {
                    short: ['오늘 하루도 화이팅!', '좋아요와 구독 부탁드려요.'],
                    long: ['여러분의 응원과 관심이 저에게 큰 힘이 됩니다. 앞으로도 좋은 콘텐츠로 보답하겠습니다.', '일상의 소소한 행복을 여러분과 함께 나누고 싶어요. 댓글로 여러분의 이야기도 들려주세요.']
                },
                philosophy: {
                    short: ['나는 생각한다, 고로 존재한다.', '삶의 의미를 찾아가는 여정.'],
                    long: ['진정한 지혜는 자신이 무지하다는 것을 아는 데서 시작된다. 겸손함이 배움의 시작이다.', '우리는 모두 불완전한 존재이지만 그 불완전함 속에서 완전함을 향해 나아가는 것이 인간의 본질이다.']
                },
                daily: {
                    short: ['오늘 날씨가 참 좋네요.', '맛있는 저녁 식사 했어요.'],
                    long: ['아침에 일어나서 창밖을 보니 햇살이 너무 좋아서 기분이 상쾌해졌어요. 오늘 하루도 행복하게 보내세요.', '친구들과 오랜만에 만나서 맛있는 음식을 먹으며 즐거운 시간을 보냈어요. 이런 순간들이 정말 소중해요.']
                }
            },
            en: {
                quote: {
                    short: ['Happiness is a habit. Cultivate it.', 'Dream big and dare to fail.'],
                    long: ['Life is like riding a bicycle. To keep your balance, you must keep moving forward.', 'Success is not final, failure is not fatal: it is the courage to continue that counts.']
                },
                book: {
                    short: ['Practice makes perfect.', 'Books are time machines.'],
                    long: ['The things we love tell us who we are. Our choices define us more than our abilities.', 'Humans can endure much more than they think they can. Strength comes from struggle.']
                },
                movie: {
                    short: ['Life is like a box of chocolates.', 'Never give up. Miracles happen.'],
                    long: ['The past can hurt, but you can either run from it or learn from it. The choice is yours.', 'Fear will always be there, but courage is not the absence of fear. It is acting in spite of it.']
                },
                music: {
                    short: ['Music is the language of the soul.', 'Songs heal the heart.'],
                    long: ['The songs we sing together have the power to unite us and give us hope for tomorrow.', 'Melodies have a magical power to convey emotions deeper than words ever could.']
                },
                news: {
                    short: ['Here is todays news.', 'The economy is recovering.'],
                    long: ['The government announced new policies today, pledging to improve the quality of life for citizens.', 'Technological advancements are rapidly changing our daily lives and creating new opportunities.']
                },
                sns: {
                    short: ['Have a great day everyone!', 'Please like and subscribe.'],
                    long: ['Your support and interest mean the world to me. I will continue to create great content for you.', 'I want to share the small joys of everyday life with you. Please share your stories in the comments.']
                },
                philosophy: {
                    short: ['I think, therefore I am.', 'The journey to find meaning.'],
                    long: ['True wisdom begins with knowing that you know nothing. Humility is the start of learning.', 'We are all imperfect beings, but striving for perfection within our imperfection is human nature.']
                },
                daily: {
                    short: ['The weather is beautiful today.', 'I had a delicious dinner.'],
                    long: ['I woke up this morning and looked outside to see beautiful sunshine. It made me feel refreshed. Have a wonderful day.', 'I met friends after a long time and enjoyed delicious food together. These moments are truly precious.']
                }
            }
        };
        this.lipSyncAnalyzer = new LipSyncAnalyzer();
        this.initializeApp();
    }
    initializeApp() {
        this.setupEventListeners();
        this.initializeSpeechRecognition();
    }
    setupEventListeners() {
        var _a, _b, _c, _d, _e, _f, _g;
        (_a = document.getElementById('startBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.showScreen('selectionScreen');
        });
        document.querySelectorAll('[data-language]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                this.selectOption('language', target.dataset.language);
                this.updateSelectionUI('language', target);
            });
        });
        document.querySelectorAll('[data-length]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                this.selectOption('length', target.dataset.length);
                this.updateSelectionUI('length', target);
            });
        });
        document.querySelectorAll('[data-category]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                this.selectOption('category', target.dataset.category);
                this.updateSelectionUI('category', target);
            });
        });
        (_b = document.getElementById('generateBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            this.generateSentence();
        });
        (_c = document.getElementById('backBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
            this.cleanup();
            this.showScreen('selectionScreen');
        });
        (_d = document.getElementById('recordBtn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
            this.startRecording();
        });
        (_e = document.getElementById('stopBtn')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
            this.stopRecording();
        });
        (_f = document.getElementById('fileInput')) === null || _f === void 0 ? void 0 : _f.addEventListener('change', (e) => {
            const target = e.target;
            if (target.files && target.files[0]) {
                this.handleFileUpload(target.files[0]);
            }
        });
        (_g = document.getElementById('retryBtn')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', () => {
            this.retryPractice();
        });
    }
    selectOption(type, value) {
        this.selection[type] = value;
        this.checkSelectionComplete();
    }
    updateSelectionUI(type, selectedBtn) {
        const group = selectedBtn.closest('.option-group');
        group === null || group === void 0 ? void 0 : group.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        selectedBtn.classList.add('selected');
    }
    checkSelectionComplete() {
        const generateBtn = document.getElementById('generateBtn');
        const isComplete = this.selection.language && this.selection.length && this.selection.category;
        generateBtn.disabled = !isComplete;
    }
    showScreen(screenId) {
        var _a;
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        (_a = document.getElementById(screenId)) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    }
    async generateSentence() {
        this.showScreen('loadingScreen');
        await new Promise(resolve => setTimeout(resolve, 2000));
        const { language, length, category } = this.selection;
        const sentences = this.sentences[language][category][length];
        this.currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
        document.getElementById('targetSentence').textContent = this.currentSentence;
        this.showScreen('practiceScreen');
        await this.initializeCamera();
        await this.initializeFaceMesh();
    }
    async initializeCamera() {
        try {
            this.videoStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 },
                audio: true
            });
            const videoElement = document.getElementById('videoElement');
            videoElement.srcObject = this.videoStream;
        }
        catch (error) {
            console.error('Camera access error:', error);
            alert('카메라 접근 권한이 필요합니다.');
        }
    }
    async initializeFaceMesh() {
        const videoElement = document.getElementById('videoElement');
        const canvas = document.getElementById('lipCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 640;
        canvas.height = 480;
        if (typeof window.FaceMesh !== 'undefined') {
            this.faceMesh = new window.FaceMesh({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
                }
            });
            this.faceMesh.setOptions({
                maxNumFaces: 1,
                refineLandmarks: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            this.faceMesh.onResults((results) => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
                    const landmarks = results.multiFaceLandmarks[0];
                    this.drawLipLandmarks(ctx, landmarks, canvas.width, canvas.height);
                    this.updateLipIndicator(true);
                    if (this.isRecording) {
                        this.lipSyncAnalyzer.captureLipData(landmarks, this.selection.language);
                    }
                }
                else {
                    this.updateLipIndicator(false);
                }
            });
            const camera = new window.Camera(videoElement, {
                onFrame: async () => {
                    await this.faceMesh.send({ image: videoElement });
                },
                width: 640,
                height: 480
            });
            camera.start();
        }
    }
    drawLipLandmarks(ctx, landmarks, width, height) {
        const upperLip = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
        const lowerLip = [146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
        ctx.beginPath();
        upperLip.forEach((idx, i) => {
            const point = landmarks[idx];
            const x = point.x * width;
            const y = point.y * height;
            if (i === 0)
                ctx.moveTo(x, y);
            else
                ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        lowerLip.forEach((idx, i) => {
            const point = landmarks[idx];
            const x = point.x * width;
            const y = point.y * height;
            if (i === 0)
                ctx.moveTo(x, y);
            else
                ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    updateLipIndicator(detected) {
        const indicator = document.getElementById('lipIndicator');
        if (indicator) {
            indicator.textContent = detected ? '✓ 입술 인식됨' : '입술 인식 중...';
            indicator.style.background = detected ? 'rgba(46, 204, 113, 0.9)' : 'rgba(102, 126, 234, 0.9)';
        }
    }
    initializeSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = false;
        }
    }
    async startRecording() {
        if (!this.videoStream)
            return;
        const recordBtn = document.getElementById('recordBtn');
        const stopBtn = document.getElementById('stopBtn');
        recordBtn.disabled = true;
        stopBtn.disabled = false;
        recordBtn.classList.add('recording');
        this.isRecording = true;
        this.recordedChunks = [];
        this.lipSyncAnalyzer.startRecording();
        this.mediaRecorder = new MediaRecorder(this.videoStream);
        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        };
        this.mediaRecorder.start();
        if (this.recognition) {
            this.recognition.lang = this.selection.language === 'ko' ? 'ko-KR' : 'en-US';
            this.recognition.start();
        }
    }
    stopRecording() {
        const recordBtn = document.getElementById('recordBtn');
        const stopBtn = document.getElementById('stopBtn');
        recordBtn.disabled = false;
        stopBtn.disabled = true;
        recordBtn.classList.remove('recording');
        this.isRecording = false;
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
        }
        if (this.recognition) {
            this.recognition.stop();
            this.recognition.onresult = async (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                await this.performIntegratedAnalysis(transcript);
            };
        }
    }
    handleFileUpload(file) {
        alert('파일 업로드 기능은 음성 인식을 위해 실시간 녹화를 권장합니다.');
    }
    async performIntegratedAnalysis(recognizedText) {
        const originalText = this.currentSentence;
        const result = await this.lipSyncAnalyzer.analyzeLipSync(originalText, recognizedText, this.selection.language);
        this.displayAnalysisResult(result, originalText, recognizedText);
    }
    displayAnalysisResult(result, originalText, recognizedText) {
        document.getElementById('analysisResult').style.display = 'block';
        document.getElementById('accuracyScore').textContent = result.finalScore.toString();
        document.getElementById('originalText').textContent = originalText;
        document.getElementById('recognizedText').textContent = recognizedText || '음성이 인식되지 않았습니다.';
        const feedback = this.generateEnhancedFeedback(result);
        document.getElementById('feedbackText').innerHTML = feedback;
        this.renderErrorList(result.detailedAnalysis.errors);
        document.getElementById('analysisResult').scrollIntoView({ behavior: 'smooth' });
    }
    // private generateEnhancedFeedback(result: LipSyncAnalysisResult): string {
    //     let feedback = '';
    //     if (result.finalScore >= 90) {
    //         feedback += '<div class="feedback-excellent">🎉 <strong>훌륭합니다!</strong></div>';
    //         feedback += '<p>발음과 입모양이 모두 정확합니다. 계속 이렇게 연습하세요!</p>';
    //     } else if (result.finalScore >= 70) {
    //         feedback += '<div class="feedback-good">👍 <strong>잘하셨습니다!</strong></div>';
    //         feedback += '<p>대부분 정확하지만 몇 가지 개선할 부분이 있습니다.</p>';
    //     } else if (result.finalScore >= 50) {
    //         feedback += '<div class="feedback-fair">💪 <strong>좋은 시도입니다!</strong></div>';
    //         feedback += '<p>더 연습이 필요합니다. 아래 피드백을 참고하세요.</p>';
    //     } else {
    //         feedback += '<div class="feedback-poor">📚 <strong>더 연습해봅시다!</strong></div>';
    //         feedback += '<p>천천히 따라하면서 입모양에 집중해보세요.</p>';
    //     }
    //     feedback += '<div class="score-breakdown">';
    //     feedback += `<div class="score-item">
    //         <span class="score-label">음성 정확도</span>
    //         <div class="score-bar">
    //             <div class="score-fill" style="width: ${result.speechScore}%"></div>
    //         </div>
    //         <span class="score-value">${result.speechScore}%</span>
    //     </div>`;
    //     feedback += `<div class="score-item">
    //         <span class="score-label">입모양 정확도</span>
    //         <div class="score-bar">
    //             <div class="score-fill" style="width: ${Math.round(result.lipSyncScore)}%"></div>
    //         </div>
    //         <span class="score-value">${Math.round(result.lipSyncScore)}%</span>
    //     </div>`;
    //     feedback += '</div>';
    //     if (result.detailedAnalysis.errors.length > 0) {
    //         feedback += '<div class="improvement-tips">';
    //         feedback += '<h4>개선이 필요한 부분:</h4>';
    //         feedback += '<ul>';
    //         const topErrors = result.detailedAnalysis.errors
    //             .filter(e => e.severity === 'high')
    //             .slice(0, 3);
    //         for (const error of topErrors) {
    //             feedback += `<li><strong>"${error.phoneme}"</strong> 발음 시: ${error.errorType}</li>`;
    //         }
    //         if (topErrors.length === 0 && result.detailedAnalysis.errors.length > 0) {
    //             const mediumErrors = result.detailedAnalysis.errors
    //                 .filter(e => e.severity === 'medium')
    //                 .slice(0, 3);
    //             for (const error of mediumErrors) {
    //                 feedback += `<li><strong>"${error.phoneme}"</strong> 발음 시: ${error.errorType}</li>`;
    //             }
    //         }
    //         feedback += '</ul>';
    //         feedback += '</div>';
    //     }
    //     return feedback;
    // }
    generateEnhancedFeedback(result) {
        let feedback = '';
        // 종합 평가
        if (result.finalScore >= 90) {
            feedback += '<div class="feedback-excellent">🎉 <strong>훌륭합니다!</strong></div>';
            feedback += '<p>발음과 입모양이 모두 정확합니다. 계속 이렇게 연습하세요!</p>';
        }
        else if (result.finalScore >= 70) {
            feedback += '<div class="feedback-good">👍 <strong>잘하셨습니다!</strong></div>';
            feedback += '<p>대부분 정확하지만 몇 가지 개선할 부분이 있습니다.</p>';
        }
        else if (result.finalScore >= 50) {
            feedback += '<div class="feedback-fair">💪 <strong>좋은 시도입니다!</strong></div>';
            feedback += '<p>더 연습이 필요합니다. 아래 피드백을 참고하세요.</p>';
        }
        else {
            feedback += '<div class="feedback-poor">📚 <strong>더 연습해봅시다!</strong></div>';
            feedback += '<p>천천히 따라하면서 입모양에 집중해보세요.</p>';
        }
        // 세부 점수
        feedback += '<div class="score-breakdown">';
        feedback += `<div class="score-item">
                <span class="score-label">음성 정확도</span>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${result.speechScore}%"></div>
                </div>
                <span class="score-value">${result.speechScore}%</span>
            </div>`;
        feedback += `<div class="score-item">
                <span class="score-label">입모양 정확도</span>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${Math.round(result.lipSyncScore)}%"></div>
                </div>
                <span class="score-value">${Math.round(result.lipSyncScore)}%</span>
            </div>`;
        feedback += '</div>';
        // 🔥 구체적인 개선 사항 (개선됨)
        // if (result.detailedAnalysis.errors.length > 0) {
        //     feedback += '<div class="improvement-tips">';
        //     feedback += '<h4>개선이 필요한 부분:</h4>';
        //     feedback += '<ul>';
        //     // 심각도 높은 에러 우선
        //     const topErrors = result.detailedAnalysis.errors
        //         .filter(e => e.severity === 'high' && e.phoneme && e.phoneme.trim() !== '')
        //         .slice(0, 3);
        //     if (topErrors.length > 0) {
        //         for (const error of topErrors) {
        //             feedback += `<li><strong>"${error.phoneme}"</strong> 발음 시: ${error.errorType}</li>`;
        //         }
        //     }
        //     else {
        //         // 높은 심각도가 없으면 중간 심각도 표시
        //         const mediumErrors = result.detailedAnalysis.errors
        //             .filter(e => e.severity === 'medium' && e.phoneme && e.phoneme.trim() !== '')
        //             .slice(0, 3);
        //         if (mediumErrors.length > 0) {
        //             for (const error of mediumErrors) {
        //                 feedback += `<li><strong>"${error.phoneme}"</strong> 발음 시: ${error.errorType}</li>`;
        //             }
        //         }
        //         else {
        //             // 에러는 있지만 표시할 내용이 없는 경우
        //             feedback += '<li>전반적으로 입모양을 더 정확하게 해주세요.</li>';
        //         }
        //     }
        //     feedback += '</ul>';
        //     feedback += '</div>';
        // }
        // else {
        //     // 에러가 없는 경우
        //     feedback += '<div class="improvement-tips" style="background: #d4edda; border-left-color: #28a745;">';
        //     feedback += '<h4>✅ 완벽합니다!</h4>';
        //     feedback += '<p>모든 발음이 정확합니다. 계속 연습하세요!</p>';
        //     feedback += '</div>';
        // }
        return feedback;
    }
    // private renderErrorList(errors: VisemeError[]): void {
    //     const container = document.getElementById('errorListContainer');
    //     if (!container) return;
    //     if (errors.length === 0) {
    //         container.innerHTML = '<p class="no-errors">✅ 발견된 오류가 없습니다!</p>';
    //         return;
    //     }
    //     container.innerHTML = '<h4>상세 오류 분석</h4>';
    //     const list = document.createElement('ul');
    //     list.className = 'error-list';
    //     for (const error of errors) {
    //         const item = document.createElement('li');
    //         item.className = `error-item severity-${error.severity}`;
    //         item.innerHTML = `
    //             <span class="error-position">#${error.position + 1}</span>
    //             <span class="error-phoneme">"${error.phoneme}"</span>
    //             <span class="error-description">${error.errorType}</span>
    //         `;
    //         list.appendChild(item);
    //     }
    //     container.appendChild(list);
    // }
    renderErrorList(errors) {
        const container = document.getElementById('errorListContainer');
        if (!container)
            return;
        // 🔥 유효한 에러만 필터링
        const validErrors = errors.filter(e => e.phoneme && e.phoneme.trim() !== '');
        if (validErrors.length === 0) {
            container.innerHTML = '<p class="no-errors">✅ 발견된 오류가 없습니다!</p>';
            return;
        }
        container.innerHTML = '<h4>상세 오류 분석</h4>';
        const list = document.createElement('ul');
        list.className = 'error-list';
        for (const error of validErrors) {
            const item = document.createElement('li');
            item.className = `error-item severity-${error.severity}`;
            // 🔥 안전한 HTML 생성
            const position = error.position + 1;
            const phoneme = error.phoneme || '알 수 없음';
            const description = error.errorType || '입 모양을 확인하세요';
            item.innerHTML = `
                    <span class="error-position">#${position}</span>
                    <span class="error-phoneme">"${phoneme}"</span>
                    <span class="error-description">${description}</span>
                `;
            list.appendChild(item);
        }
        container.appendChild(list);
    }
    retryPractice() {
        document.getElementById('analysisResult').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    cleanup() {
        if (this.videoStream) {
            this.videoStream.getTracks().forEach(track => track.stop());
            this.videoStream = null;
        }
        if (this.faceMesh) {
            this.faceMesh.close();
            this.faceMesh = null;
        }
        if (this.recognition) {
            this.recognition.stop();
        }
        this.isRecording = false;
    }
}
// Initialize app
new AppState();
