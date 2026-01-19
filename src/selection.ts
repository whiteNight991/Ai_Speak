import { UserSelection } from './types';

export class SelectionManager {
  private selection: Partial<UserSelection> = {};

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const lang = target.dataset.language;
        const length = target.dataset.length;
        const category = target.dataset.category;

        if (lang) this.selection.language = lang as UserSelection['language'];
        if (length) this.selection.length = length as UserSelection['length'];
        if (category) this.selection.category = category as UserSelection['category'];

        // 버튼 시각적 활성화
        const siblings = target.parentElement?.querySelectorAll('.option-btn');
        siblings?.forEach(sib => sib.classList.remove('active'));
        target.classList.add('active');
      });
    });
  }

  isComplete(): boolean {
    return !!(this.selection.language && this.selection.length && this.selection.category);
  }

  getSelection(): UserSelection | null {
    if (this.isComplete()) return this.selection as UserSelection;
    return null;
  }
}
