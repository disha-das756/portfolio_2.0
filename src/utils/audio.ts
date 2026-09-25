// Web Audio API Synthesizer for Zen Garden Soundscape (No external audio file dependencies)

class ZenAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Plays a tranquil Japanese Koto note from the Hirajoshi pentatonic scale
  public playKotoNote(noteIndex: number = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // Hirajoshi Pentatonic Scale frequencies (C4, Db4, F4, G4, Ab4, C5, Db5, F5, G5)
    const scale = [261.63, 277.18, 349.23, 392.0, 415.3, 523.25, 554.37, 698.46, 783.99];
    const freq = scale[Math.abs(noteIndex) % scale.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Triangle / sine wave for wooden plucked string resonance
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 1.2);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.9);
  }

  // Plays a warm, resonant Zen temple bell (528 Hz Solfeggio / meditative chime)
  public playTempleBell() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const baseFreq = 528; // Transformation & Miracles tone
    const partials = [1, 2.02, 3.01, 4.15];
    const gains = [0.25, 0.12, 0.06, 0.03];

    partials.forEach((partial, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * partial, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(gains[i], now);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 3.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 3.3);
    });
  }

  // Play gentle wind chime ripple
  public playWindChime() {
    if (this.isMuted) return;
    const notes = [0, 2, 3, 5, 6, 7];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        this.playKotoNote(n);
      }, idx * 90);
    });
  }

  // Water drop ripple sound for koi pond
  public playWaterDrop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  }
}

export const zenAudio = new ZenAudioEngine();
