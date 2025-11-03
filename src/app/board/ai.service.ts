import { inject } from "@angular/core";
import { BoardService } from "./board.service";

export class AIService{
  boardService: BoardService;

  constructor(boardService: BoardService){
    this.boardService  = boardService;
  }

  dumbStrategyMove(){
    var possibleMoves = [];
    
    for(var x=0; x<8; x++){
        for(var y=0; y<8; y++){
            if(this.boardService.possibleMove(x, y)){
                possibleMoves[possibleMoves.length] = [x, y];
            }
        }
    }

    return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  }

  smartStrategyMove(){
    var possibleMoves = [];
    
    for(var x=0; x<8; x++){
        for(var y=0; y<8; y++){
            if(this.boardService.possibleMove(x, y)){
                possibleMoves[possibleMoves.length] = [x, y, this.boardService.flipTiles(x, y, false)];
            }
        }
    }

    possibleMoves.sort((b: number[], a: number[]) => a[2] - b[2]);

    var maxScore = possibleMoves[0][2];

    possibleMoves = possibleMoves.filter((move) => move[2] === maxScore);

    return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  }

  smartPlusStrategyMove(){
    var possibleMoves = [];
    
    for(var x=0; x<8; x++){
        for(var y=0; y<8; y++){
            if(this.boardService.possibleMove(x, y)){
                possibleMoves[possibleMoves.length] = [x, y, this.boardService.flipTiles(x, y, false) + ((x===0 || x===7) ? 1 : 0) + ((y===0 || y===7) ? 1 : 0)];
            }
        }
    }

    possibleMoves.sort((b: number[], a: number[]) => a[2] - b[2]);

    var maxScore = possibleMoves[0][2];

    possibleMoves = possibleMoves.filter((move) => move[2] === maxScore);

    return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  }
}