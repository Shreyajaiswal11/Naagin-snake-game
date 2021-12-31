let inputDir={x:0,y:0};
 const foodSound=new Audio('eating.mp3');
 const gameoverSound= new Audio('over.mp3');
 const moveSound=new Audio('bg.mp3');
let speed=5;
let lastPaintTime =0;
let snakearr=[{x:10,y:10}];
let food={x:4,y:8};
let score=0;

//game functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000< (1/speed))
    {
    return;
}
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(sarr){
    //if you bump into yourself
    for(let i=1;i<sarr.length;i++)
    {
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y )
        return true;
    }
    //if you bump into wall
    if(sarr[0].x>=18||sarr[0].x<=0||sarr[0].y>=18||sarr[0].y<=0)
    return true;
}
function gameEngine()
{
  //  update snake array
  if(isCollide(snakearr)){ 
      gameoverSound.play();
      moveSound.pause();
      speed =5
      inputDir={x:0,y:0};
      alert("Game Over press any key to Play again");
       snakearr=[{x:10 , y:10}];
      moveSound.play()
      score=0;
  }
  //if snake eats the food regenerate food and incremet score
  if(snakearr[0].y == food.y && snakearr[0].x == food.x){
    foodSound.play()
    score += 1;
    scoreBox.innerHTML="Score" + " " + score;
      snakearr.unshift({x:snakearr[0].x + inputDir.x, y:snakearr[0].y + inputDir.y})
      

      let a=2;
      let b=16;
      food={x: Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
  }
  //moving of snake
  for(let i=snakearr.length-2;i>=0;i--)
    {
        snakearr[i+1]= {...snakearr[i]} ;
    }
   snakearr[0].x+=inputDir.x;
    snakearr[0].y+=inputDir.y;

  //display snake and food
  //display snake
  board.innerHTML="";
  snakearr.forEach((e,index)=>{
      snakeElement=document.createElement('div');
      snakeElement.style.gridRowStart=e.y;
      snakeElement.style.gridColumnStart=e.x;
      if(index==0){
          snakeElement.classList.add('head');
      }
      else
        snakeElement.classList.add('snake');

      board.appendChild(snakeElement);
   });
  //display food
  snakearr.forEach((e,index) =>{
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
  });
  
}

//our main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the game
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
                       inputDir.x=0;
                       inputDir.y=-1;
                break;
        case "ArrowDown":
                         inputDir.x=0;
                         inputDir.y=1;

                break;
        case "ArrowLeft":
                          inputDir.x=-1;
                          inputDir.y=0;
        

                break;
        case "ArrowRight":
                          inputDir.x=1;
                          inputDir.y=0;

               break;
        default:break;

    }
});
