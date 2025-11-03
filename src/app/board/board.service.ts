import { Injectable } from "@angular/core";
import { AIService } from "./ai.service";

@Injectable({ providedIn: 'root' })
export class BoardService{
    // 0 - Empty
    // 1 - White
    // 2 - Black
    // 3 - Has Move
    private board = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    private turn = 2;

    private aiService = new AIService(this);

    blackMode = "human";

    whiteMode = "smart+";

    win = false;

    winner = "";

    private nextTurn(){
        if(this.turn==2){
            this.turn = 1;
        }else{
            this.turn = 2;
        }
    }

    flipTiles(x: number, y: number, forReal: boolean){
        var flips = 0;
        var opposite = (this.turn == 1) ? 2 : 1;
        for(var dx=-1; dx<2; dx++){
            for(var dy=-1; dy<2; dy++){
                var i = dx;
                var j = dy;
                while(this.inBounds(x+i, y+j) && this.board[y+j][x+i]===opposite){
                    i += dx;
                    j += dy;
                }
                if(this.inBounds(x+i, y+j) && this.board[y+j][x+i]===this.turn){
                    while(!(i==0 && j==0)){
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
        return (x>=0 && x<= 7) && (y>=0 && y<= 7);
    }

    possibleMove(x: number, y: number){
        return this.inBounds(x, y) && this.board[y][x]==0 && this.flipTiles(x, y, false)>0;
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
            if(this.whiteMode!="human"){
                setTimeout(() => 
                    {
                        this.makeMove(-1, -1);
                    }, 
                    250
                );
            }
        }else{
            if(this.blackMode!="human"){
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
        var possibleMoves = 0;
    
        for(var tx=0; tx<8; tx++){
            for(var ty=0; ty<8; ty++){
                if(this.possibleMove(tx, ty)){
                    possibleMoves++;
                }
            }
        }

        if(possibleMoves>0){
            if(this.turn === 1){
                switch(this.whiteMode){
                    case "human":
                        this.performMove(x, y);
                        break;
                    case "dumb":
                        var move = this.aiService.dumbStrategyMove();
                        this.performMove(move[0], move[1]);
                        break;
                    case "smart":
                        var move = this.aiService.smartStrategyMove();
                        this.performMove(move[0], move[1]);
                        break;
                    case "smart+":
                        var move = this.aiService.smartPlusStrategyMove();
                        this.performMove(move[0], move[1]);
                        break;
                }
            }else if(this.turn === 2){
                switch(this.blackMode){
                    case "human":
                        this.performMove(x, y);
                        break;
                    case "dumb":
                        var move = this.aiService.dumbStrategyMove();
                        this.performMove(move[0], move[1]);
                        break;
                    case "smart":
                        var move = this.aiService.smartStrategyMove();
                        this.performMove(move[0], move[1]);
                        break;
                    case "smart+":
                        var move = this.aiService.smartPlusStrategyMove();
                        this.performMove(move[0], move[1]);
                        break;
                }
            }
            this.secheduleAIMove();
        }else{
            this.win = true;
            var score = this.getScore();
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
        var localBoard = JSON.parse(JSON.stringify(this.board));
        for(var x=0; x<8; x++){
            for(var y=0; y<8; y++){
                if(this.possibleMove(x, y)) localBoard[y][x] = 3;
            }
        }
        return localBoard;
    }

    getTurn(){
        return this.turn;
    }

    getScore(){
        var scores = [0, 0];
        for(var x=0; x<8; x++){
            for(var y=0; y<8; y++){
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
            }
        }
        return scores;
    }

    reset(){
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
        this.turn = 2;
        this.win = false;
        this.winner = "";
    }
}