import { Component } from '@angular/core';
import { BoardComponent } from "./board/board.component";
import { ScoreDisplayComponent } from "./score-display/score-display.component";
import { ControlPanelComponent } from "./control-panel/control-panel.component";

@Component({
  selector: 'app-root',
  imports: [BoardComponent, ScoreDisplayComponent, ControlPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reversi-in-browser';
}
