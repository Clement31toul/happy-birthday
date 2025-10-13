let muted = false;
let ctx: AudioContext | null = null;

function ac(): AudioContext {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx!;
}

function playErrorBuzz() {
  if (muted) return;
  const { audio, gain, now } = envGain(0.2, 0.005, 0.12);
  const osc = audio.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(280, now);
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);
  osc.connect(gain);
  osc.start(now);
  osc.stop(now + 0.22);
}

function envGain(duration: number, attack = 0.01, release = 0.2) {
  const audio = ac();
  const gain = audio.createGain();
  const now = audio.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(1, now + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + release);
  gain.connect(audio.destination);
  return { audio, gain, now };
}

function playClickTone() {
  if (muted) return;
  const { audio, gain, now } = envGain(0.05, 0.001, 0.05);
  const osc = audio.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(2400, now + 0.03);
  osc.connect(gain);
  osc.start(now);
  osc.stop(now + 0.08);
}

function playFlipTone() {
  if (muted) return;
  const { audio, gain, now } = envGain(0.14, 0.005, 0.1);
  const osc = audio.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);
  osc.connect(gain);
  osc.start(now);
  osc.stop(now + 0.18);
}

function playWaterRipple() {
  if (muted) return;
  const { audio, gain, now } = envGain(0.25, 0.01, 0.2);
  const osc = audio.createOscillator();
  const lfo = audio.createOscillator();
  const lfoGain = audio.createGain();
  lfoGain.gain.value = 20; // vibrato depth
  lfo.frequency.value = 6;
  osc.type = 'sine';
  osc.frequency.value = 520;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);
  osc.connect(gain);
  osc.start(now);
  lfo.start(now);
  osc.stop(now + 0.28);
  lfo.stop(now + 0.28);
}

let engineNode: { osc: OscillatorNode; gain: GainNode } | null = null;
function startEngine() {
  if (muted) return;
  const audio = ac();
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const lfo = audio.createOscillator();
  const lfoGain = audio.createGain();
  osc.type = 'sawtooth';
  osc.frequency.value = 90;
  gain.gain.value = 0.0001;
  lfo.frequency.value = 1.2; // idle wobble
  lfoGain.gain.value = 8;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);
  osc.connect(gain);
  gain.connect(audio.destination);
  const now = audio.currentTime;
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.12);
  osc.start();
  lfo.start();
  engineNode = { osc, gain };
  // auto stop after short cue
  setTimeout(stopEngine, 800);
}

function stopEngine() {
  if (!engineNode) return;
  const audio = ac();
  const now = audio.currentTime;
  engineNode.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
  try { engineNode.osc.stop(now + 0.16); } catch {}
  engineNode = null;
}

function startEngineLoop(durationMs?: number) {
  if (muted) return;
  if (engineNode) stopEngine();
  const audio = ac();
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const lfo = audio.createOscillator();
  const lfoGain = audio.createGain();
  osc.type = 'sawtooth';
  osc.frequency.value = 85;
  gain.gain.value = 0.0001;
  lfo.frequency.value = 1.1;
  lfoGain.gain.value = 10;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);
  osc.connect(gain);
  gain.connect(audio.destination);
  const now = audio.currentTime;
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.2);
  osc.start();
  lfo.start();
  engineNode = { osc, gain };
  if (durationMs && durationMs > 0) {
    setTimeout(() => {
      try { stopEngine(); } catch {}
    }, durationMs);
  }
}

const sfx = {
  setMuted(value: boolean) {
    muted = value;
  },
  playFlip: playFlipTone,
  playClick: playClickTone,
  playError: playErrorBuzz,
  playWater: playWaterRipple,
  playEngine: startEngine,
  playEngineLoop: startEngineLoop,
  stopEngine,
  speak(text: string, lang = 'fr-FR') {
    if (muted) return;
    const synth: SpeechSynthesis | undefined = (typeof window !== 'undefined' ? window.speechSynthesis : undefined);
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 1;
    utter.pitch = 1;
    // Try to pick a French voice if available
    const voices = synth.getVoices?.() || [];
    const v = voices.find((v) => v.lang?.toLowerCase().startsWith('fr')) || voices[0];
    if (v) utter.voice = v;
    synth.cancel();
    synth.speak(utter);
  },
  stopSpeak() {
    const synth: SpeechSynthesis | undefined = (typeof window !== 'undefined' ? window.speechSynthesis : undefined);
    synth?.cancel();
  }
};

export default sfx;
