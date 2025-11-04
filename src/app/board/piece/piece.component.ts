import { Component, inject, Input } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-piece',
  imports: [],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.css'
})
export class PieceComponent {
  @Input({required: true}) cell!: number;
  @Input({required: true}) x!: number;
  @Input({required: true}) y!: number;
  boardService = inject(BoardService);

  get imagePath(){
    let assetName = "";
    const assetPath = "../../../assets/";
    switch(this.cell){
      case 0:
        assetName = "empty.png";
        break;
      case 1:
        assetName = "white.png";
        break;
      case 2:
        assetName = "black.png";
        break;
      case 3:
        assetName = "possible.png";
        break;
      default:
        assetName = "empty.png";
        break;
    }
    return assetPath+assetName;
  }

  onClick(){
    console.log("Clicked field at (x:"+this.x+", y:"+this.y+")");
    this.boardService.makeMove(this.x, this.y);
  }
}
