// retrieving the boxes of tic-tac-toe, current player status and new game button
const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const newGameButton= document.querySelector('.button');

let currentPlayer;   //Current player
let gameGrid;  

// wining positions on the grid
const winningPosition=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//  initial function which will be called when the game just starts
function initialise()
{
    currentPlayer='X';
    gameGrid=["","","","","","","","",""];  // make the grid empty
    newGameButton.classList.remove('active');   // it will remove the button as active is the class that makes the button visible
    gameInfo.innerText=`Current Player - ${currentPlayer}`;   // it will showcase the statement of Current player

    boxes.forEach((box,index)=>{
        box.innerText='';
        boxes[index].style.pointerEvents='all';
        box.classList.remove('win');
    });
    
}

initialise();

function swapTurn()
{
    if(currentPlayer==='X')
    {
    currentPlayer='O';
    }

    else
    {
        currentPlayer='X';
    }

    // updating the UI:
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkgameOver()
{
    let winner="";
    winningPosition.forEach((position)=>{

        // it will take a particular array from winner position and then check if each position of that array is filled with 
        // 'X' or 'O' and then choose the winner
        if((gameGrid[position[0]]!=='' || gameGrid[position[1]]!=='' || gameGrid[position[2]]!=='') && (gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]]))
        {
            if(gameGrid[position[0]]==='X')
            {
                winner='X';
            }
            else
            {
                winner='O';
            }

            // it will make the pointer to not change when anyone wins and click will not take place
            boxes.forEach((box)=>{
                box.style.pointerEvents='None';
            })
            // change the colour of the boxes as green on winning
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }});

        // if winner will be found
        if(winner!=="")
        {
            gameInfo.innerText=`Winner Player - ${winner}`;
            newGameButton.classList.add('active');
            return;
        }

        // this is used to check if all the boxes are filled or not and 
        // if boxes will be filled, then the game has tied.
        let filled_count=0;
        gameGrid.forEach((box)=>{
            if(box!=='')
            filled_count++;
        });

        if(filled_count===9)
        {
            gameInfo.innerText="It's a Tie!";
            newGameButton.classList.add('active');
            return;
        }
}
function handleClick(index)
{
    if(gameGrid[index]==="")  // if the index where we want to click is empty
    {
        boxes[index].innerHTML=currentPlayer;  // mark the current player on the box;
        gameGrid[index]=currentPlayer; 
        
        boxes[index].style.pointerEvents='none';  // it will make the pointer to not change once a value is inserted into it and the box will become non clickable.

        swapTurn();  // swap the turn between 'X' and 'O'

        checkgameOver();  // to check if clicking once makes one winner or not
    }
}



// forEach() is a method that will call a function for each element of the 
// boxes and will call the function inside it.
// Mandatory field in the function parameter is the current item being taken into action.
boxes.forEach( (box,index) => {
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

newGameButton.addEventListener('click',initialise);
