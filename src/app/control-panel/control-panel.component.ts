import { Component, inject } from '@angular/core';
import { BoardService } from '../board/board.service';

@Component({
  selector: 'app-control-panel',
  imports: [],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  boardService = inject(BoardService);
  
  reset(){
    this.boardService.reset();
  }

  onBlackChange(event: Event){
    console.log((event.target as HTMLInputElement).value);
    this.boardService.blackMode = (event.target as HTMLInputElement).value;
  }

  onWhiteChange(event: Event){
    console.log((event.target as HTMLInputElement).value);
    this.boardService.whiteMode = (event.target as HTMLInputElement).value;
  }
}
