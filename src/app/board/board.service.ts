import { Injectable } from "@angular/core";
import { AIService } from "./ai.service";
import { AILevel } from "./game.model";

@Injectable({ providedIn: 'root' })
export class BoardService{
    // 0 - Empty
    // 1 - White
    // 2 - Black
    // 3 - Has Move
    board: number[][] = [];

    private turn = 2;

    private aiService = new AIService(this);

    blackMode = AILevel.human;

    whiteMode = AILevel.smart_plus;

    win = false;

    winner = "";

    constructor(){
        this.initBoard();
    }

    initBoard(){
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }

    private nextTurn(){
        if(this.turn === 2){
            this.turn = 1;
        }else{
            this.turn = 2;
        }
    }

    flipTiles(x: number, y: number, forReal: boolean){
        let flips = 0;
        const opposite = (this.turn === 1) ? 2 : 1;
        for(let dx=-1; dx<2; dx++){
            for(let dy=-1; dy<2; dy++){
                let i = dx;
                let j = dy;
                while(this.inBounds(x+i, y+j) && this.board[y+j][x+i] === opposite){
                    i += dx;
                    j += dy;
                }
                if(this.inBounds(x+i, y+j) && this.board[y+j][x+i] === this.turn){
                    while(!(i===0 && j===0)){
                        i -= dx;
                        j -= dy;
                        flips++;
                        if(forReal) this.board[y+j][x+i] = this.turn;
                    }
                    flips--;
                }
            }
        }
        return flips;
    }

    inBounds(x: number, y: number){
        return (x>=0 && x<=7) && (y>=0 && y<=7);
    }

    possibleMove(x: number, y: number){
        return this.inBounds(x, y) && this.board[y][x]===0 && this.flipTiles(x, y, false)>0;
    }

    private performMove(x: number, y: number){
        if(this.possibleMove(x, y)){
            this.board[y][x] = this.turn;
            this.flipTiles(x, y, true);
            this.nextTurn();
        }
    }

    private secheduleAIMove(){
        if(this.turn===1){
            if(this.whiteMode!==AILevel.human){
                setTimeout(() => 
                    {
                        this.makeMove(-1, -1);
                    }, 
                    250
                );
            }
        }else{
            if(this.blackMode!==AILevel.human){
                setTimeout(() => 
                    {
                        this.makeMove(-1, -1);
                    }, 
                    100
                );
            }
        }
    }

    makeMove(x: number, y: number){
        let possibleMoves = 0;
        
        this.board.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (this.possibleMove(x, y)) {
                    possibleMoves++;
                }
            })
        });

        if(possibleMoves>0){
            let move: number[] = [-1, -1];
            if(this.turn === 1){
                switch(this.whiteMode){
                    case AILevel.human:
                        move = [x, y];
                        break;
                    case AILevel.dumb:
                        move = this.aiService.dumbStrategyMove();
                        break;
                    case AILevel.smart:
                        move = this.aiService.smartStrategyMove();
                        break;
                    case AILevel.smart_plus:
                        move = this.aiService.smartPlusStrategyMove();
                        break;
                }
            }else if(this.turn === 2){
                switch(this.blackMode){
                    case AILevel.human:
                        move = [x, y];
                        break;
                    case AILevel.dumb:
                        move = this.aiService.dumbStrategyMove();
                        break;
                    case AILevel.smart:
                        move = this.aiService.smartStrategyMove();
                        break;
                    case AILevel.smart_plus:
                        move = this.aiService.smartPlusStrategyMove();
                        break;
                }
            }
            this.performMove(move[0], move[1]);
            this.secheduleAIMove();
        }else{
            this.win = true;
            const score = this.getScore();
            if(score[0]>score[1]){
                this.winner = "White wins!";
            }else if(score[0]<score[1]){
                this.winner = "Black wins!";
            }else{
                this.winner = "Stalemate!";
            }
        }
    }

    getBoard(){
        let localBoard = JSON.parse(JSON.stringify(this.board));
        this.board.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (this.possibleMove(x, y)) localBoard[y][x] = 3;
            })
        });
        return localBoard;
    }

    getTurn(){
        return this.turn;
    }

    getScore(){
        let scores = [0, 0];
        this.board.forEach((row, y) => {
            row.forEach((cell, x) => {
                switch(this.board[y][x]){
                    case 1:
                        scores[0]++;
                        break;
                    case 2:
                        scores[1]++;
                        break;
                    default:
                        break;
                }
            })
        });
        return scores;
    }

    reset(){
        this.initBoard();
        this.turn = 2;
        this.win = false;
        this.winner = "";
    }
}