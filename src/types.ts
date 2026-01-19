export type LanguageOption = 'ko' | 'en';
export type SentenceLength = 'short' | 'long';
export type Category =
  | 'quote'
  | 'book'
  | 'movie'
  | 'music'
  | 'news'
  | 'sns'
  | 'philosophy'
  | 'daily';

export interface UserSelection {
  language: LanguageOption;
  length: SentenceLength;
  category: Category;
}

export interface AnalysisResult {
  accuracy: number;
  originalText: string;
  recognizedText: string;
  feedback: string;
}
