import * as Tone from "tone";
import { Sound } from "./utils/constants";

class SoundManager {
  constructor() {
    this._boxSequence = ["D4", "F4", "A4", "C5", "E5"];
    this._currNoteIdx = 0;
    this._sequenceOrder = Sound.SequenceOrder.Ascending;
  }

  start() {
    Tone.start();
  }

  simpleSound() {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease("C4", "8n", now);
  }
  backgroundMusic() {
    document.getElementById("tone").addEventListener("click", () => {
    
      const synth = new Tone.Synth().toDestination();
      const now = Tone.now();
      synth.triggerAttackRelease("C4", "8n", now);
      synth.triggerAttackRelease("E4", "8n", now + 0.5);
      synth.triggerAttackRelease("G4", "8n", now + 1);

    });
  }

  playCollisionSound() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    const currNote = this._boxSequence[this.currNoteIdx];

    synth.triggerAttack(currNote, now);
    synth.triggerRelease(currNote, now + 1);
  }

  get currNoteIdx() {
    const maxIdx = this._boxSequence.length - 1;
    const minIdx = 0;
   
    console.log('hey')
  

    switch (this._sequenceOrder) {
      case Sound.SequenceOrder.Ascending:
        if (this._currNoteIdx === maxIdx) {
          this._sequenceOrder = Sound.SequenceOrder.Descending;
          this._currNoteIdx--;
        } else {
          this._currNoteIdx++;
        }

        break;

      case Sound.SequenceOrder.Descending:
        if (this._currNoteIdx === minIdx) {
          this._sequenceOrder = Sound.SequenceOrder.Ascending;
          this._currNoteIdx++;
        } else {
          this._currNoteIdx--;
        }
        break;
    }
   
    return this._currNoteIdx;
  }
}

export const soundManager = new SoundManager();
