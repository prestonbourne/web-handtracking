class ScoreManager{
 constructor(){
  this._score = 0;
 }

 
 increment(){
  this._score++
 }
 
 get score(){
  return this._score;
 }
}

export const scoreManager = new ScoreManager()