import * as Tone from "tone";
import { Assets, Sound } from "./utils/constants";

class SoundManager {
  constructor() {
    //  this._boxSequence = ["D4", "F4", "A4", "C5", "E5"];
    this._boxSequence = ["D4", "E4", "F#4", "G4", "A4", "B4", "C#4", "D5"];
    this._currNoteIdx = 0;
    this._sequenceOrder = Sound.SequenceOrder.Ascending;

    this.membrane = new Tone.MembraneSynth().toDestination();
    this.noise = new Tone.NoiseSynth().toDestination();
    this.metal = new Tone.MetalSynth().toDestination();
    this.membrane.volume.value = -5;
    this.noise.volume.value = -5;
    this.metal.volume.value = -5;
  }

  start() {
    Tone.start();
    this.backgroundMusic();
  }

  backgroundMusic() {
    const player = new Tone.Player(Assets.BackgroundMusic).toDestination();
    player.loop = true

    Tone.loaded().then(() => {
      player.start();
    });
  }

  playCollisionSound() {
    // const synth = new Tone.PolySynth().toDestination();
    // synth.volume.value = 1
    // const now = Tone.now();
     const currNote = this._boxSequence[this.currNoteIdx];

    // synth.triggerAttack(currNote, now);
    // synth.triggerRelease(currNote, now + .5);

    this.membrane.triggerAttackRelease(currNote, "2n");
    this.noise.triggerAttackRelease("8n");
    this.metal.triggerAttackRelease(currNote, "32n");
  }

  get currNoteIdx() {
    // return 0
    const maxIdx = this._boxSequence.length - 1;
    const minIdx = 0;

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
