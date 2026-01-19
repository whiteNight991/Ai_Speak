export function showScreen(screenId: string) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (screen) screen.classList.add('active');
}

export function enableButton(buttonId: string) {
  const btn = document.getElementById(buttonId) as HTMLButtonElement;
  if (btn) btn.disabled = false;
}

export function disableButton(buttonId: string) {
  const btn = document.getElementById(buttonId) as HTMLButtonElement;
  if (btn) btn.disabled = true;
}

export function updateAccuracy(score: number) {
  const el = document.getElementById('accuracyScore');
  if (el) el.textContent = score.toString();
}

export function displaySentence(target: string) {
  const el = document.getElementById('targetSentence');
  if (el) el.textContent = target;
}

export function displayAnalysis(result: { accuracy: number; originalText: string; recognizedText: string; feedback: string }) {
  showScreen('practiceScreen');
  const analysisDiv = document.getElementById('analysisResult');
  if (analysisDiv) analysisDiv.style.display = 'block';
  updateAccuracy(result.accuracy);
  const originalEl = document.getElementById('originalText');
  const recognizedEl = document.getElementById('recognizedText');
  const feedbackEl = document.getElementById('feedbackText');
  if (originalEl) originalEl.textContent = result.originalText;
  if (recognizedEl) recognizedEl.textContent = result.recognizedText;
  if (feedbackEl) feedbackEl.textContent = result.feedback;
}

export function showRetryMessage() {
  const analysisDiv = document.getElementById('analysisResult');
  const feedbackEl = document.getElementById('feedbackText');
  const accuracyEl = document.getElementById('accuracyScore');

  if (analysisDiv) analysisDiv.style.display = 'block';
  if (feedbackEl) feedbackEl.textContent = '❗ 문장이 정확히 인식되지 않았어요. 다시 말해보세요.';
  if (accuracyEl) accuracyEl.textContent = '0';
}
