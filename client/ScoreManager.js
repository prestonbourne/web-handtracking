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

 set score(newScore){
  this._score = newScore;
 }
}

export const scoreManager = new ScoreManager()