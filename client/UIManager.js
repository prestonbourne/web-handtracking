class UIManager{
 constructor(){
  this.$canvas = document.getElementById('game_canvas');
  this.$scoreCountCounter = document.getElementById('score_overlay');
  this.$scoreCount = document.getElementById('score_count');
  
 }

 /**
  * @param {number} count
  */
 set score(count){
  const countStr = count.toString();
  this.$scoreCount.innerText = countStr;
 }

 init(){
  this.$scoreCountCounter.style.display = "flex"
 }
}


export const uiManager = new UIManager()