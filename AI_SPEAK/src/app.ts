import { showScreen, displaySentence, displayAnalysis, enableButton, disableButton } from './ui';
import { SelectionManager } from './selection';
import { FaceMeshManager } from './faceMesh';
import { VideoRecorder } from './recorder';
import { Analyzer } from './analyzer';

const selection = new SelectionManager();
const videoEl = document.getElementById('videoElement') as HTMLVideoElement;
const faceMesh = new FaceMeshManager(videoEl);
const recorder = new VideoRecorder(videoEl);
const analyzer = new Analyzer();

const startBtn = document.getElementById('startBtn')!;
const generateBtn = document.getElementById('generateBtn')!;
const recordBtn = document.getElementById('recordBtn')!;
const stopBtn = document.getElementById('stopBtn')!;
const retryBtn = document.getElementById('retryBtn')!;

startBtn.addEventListener('click', () => showScreen('selectionScreen'));

document.querySelectorAll('.option-btn').forEach(() => {
  generateBtn.disabled = !selection.isComplete();
});

generateBtn.addEventListener('click', () => {
  const sel = selection.getSelection();
  if (!sel) return;
  const sentence = `예시 문장: ${sel.category}`;
  displaySentence(sentence);
  showScreen('practiceScreen');
  faceMesh.init();
});

recordBtn.addEventListener('click', () => {
  recorder.start();
  recordBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', async () => {
  const videoBlob = await recorder.stop();
  recordBtn.disabled = false;
  stopBtn.disabled = true;
  const sel = selection.getSelection();
  if (!sel) return;
  const result = analyzer.analyze(videoBlob, `예시 문장: ${sel.category}`);
  displayAnalysis(result);
});

retryBtn.addEventListener('click', () => {
  showScreen('selectionScreen');
});
