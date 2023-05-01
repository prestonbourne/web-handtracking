import * as Tone from "tone";

class SoundManager {
  constructor() {
    this._boxSequence = ["D4", "F4", "A4", "C5", "E5"];
    this._currNoteIdx = 0;
  }

  start(){
   Tone.start()
  }

  simpleSound() {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease("C4", "8n", now);
  }
  backgroundMusic() {
    document.getElementById("tone").addEventListener("click", () => {
      Tone.start();
      const synth = new Tone.Synth().toDestination();
      const now = Tone.now();
      synth.triggerAttackRelease("C4", "8n", now);
      synth.triggerAttackRelease("E4", "8n", now + 0.5);
      synth.triggerAttackRelease("G4", "8n", now + 1);

    
      synth.triggerAttack(currNote, now);
    });
  }

  playCollisionSound() {
   
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    const currNote = this._boxSequence[this.currNoteIdx];
  
    synth.triggerAttack(currNote, now);
    synth.triggerRelease(currNote, now+1)
  }

  get currNoteIdx() {
    const maxIdx = this._boxSequence.length - 1;

    if (this._currNoteIdx === maxIdx) {
      this._currNoteIdx = 0;
    }

    const result = this._currNoteIdx;
    this._currNoteIdx++;

    return result;
  }
}

export const soundManager = new SoundManager();


