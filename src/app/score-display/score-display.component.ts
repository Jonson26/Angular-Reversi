import { Component, inject } from '@angular/core';
import { BoardService } from '../board/board.service';

@Component({
  selector: 'app-score-display',
  imports: [],
  templateUrl: './score-display.component.html',
  styleUrl: './score-display.component.css'
})
export class ScoreDisplayComponent {
  boardService = inject(BoardService);

  get blackScore(){
    return this.boardService.getScore()[1];
  }

  get whiteScore(){
    return this.boardService.getScore()[0];
  }
}
