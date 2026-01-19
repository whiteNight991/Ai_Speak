// faceMesh.ts
let _faceMesh: any = null;
let _camera: any = null;

export interface MouthFrame {
  openness: number;
  roundness: number;
  timestamp: number;
}

export class FaceMesh {
  private mouthFrames: MouthFrame[] = [];

  constructor(private video: HTMLVideoElement) {}

  async init() {
    if (_faceMesh) return _faceMesh;

    const mp = await import('@mediapipe/face_mesh/face_mesh');
    const camUtils = await import('@mediapipe/camera_utils/camera_utils');

    _faceMesh = new mp.FaceMesh({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    _faceMesh.onResults(this.onResults.bind(this));

    _camera = new camUtils.Camera(this.video, {
      onFrame: async () => {
        await _faceMesh.send({ image: this.video });
      },
      width: 640,
      height: 480
    });

    _camera.start();
    return _faceMesh;
  }

  onResults(results: any) {
    if (!results.multiFaceLandmarks?.length) return;
    const lm = results.multiFaceLandmarks[0];

    const upperLip = lm[13];
    const lowerLip = lm[14];
    const leftLip = lm[61];
    const rightLip = lm[291];

    const openness = Math.max(0, Math.min(1, Math.abs(lowerLip.y - upperLip.y)));
    const roundness = Math.max(0, Math.min(1, 1 - Math.abs(rightLip.x - leftLip.x)));

    this.mouthFrames.push({
      openness,
      roundness,
      timestamp: performance.now(),
    });
  }

  getMouthSequence() {
    return this.mouthFrames;
  }

  clear() {
    this.mouthFrames = [];
  }
}
