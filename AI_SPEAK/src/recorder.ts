export class VideoRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];

  constructor(private video: HTMLVideoElement) {}

  start() {
    const stream = this.video.srcObject as MediaStream;
    if (!stream) return;
    this.mediaRecorder = new MediaRecorder(stream);
    this.chunks = [];
    this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    this.mediaRecorder.start();
  }

  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) return resolve(new Blob());
      this.mediaRecorder.onstop = () => resolve(new Blob(this.chunks, { type: 'video/webm' }));
      this.mediaRecorder.stop();
    });
  }
}
