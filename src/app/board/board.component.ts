import { Component, inject } from '@angular/core';
import { PieceComponent } from "./piece/piece.component";
import { BoardService } from './board.service';

@Component({
  selector: 'app-board',
  imports: [PieceComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  boardService = inject(BoardService);
}
