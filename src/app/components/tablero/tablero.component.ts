import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { SalasService } from '../../services/salas-service/salas.service';
import { NumeroJugador, PosicionTablero } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableroComponent {

 
  salaService = inject(SalasService)


  isMyTurn = computed(()=> 
    (this.salaService.state() === "TURNO_P1" && this.salaService.numeroDeJugadores() === 1) || 
    (this.salaService.state() === "TURNO_P2" && this.salaService.numeroDeJugadores() === 2));

    jugar(posicion:PosicionTablero){
      this.salaService.jugar(posicion);
    }
  

    getMarca(jugador: "" | NumeroJugador){
      if(!jugador) return ""
      if(jugador === 1) return "X";
      return "O"
    }

    casillas:PosicionTablero[] = [0,1,2,3,4,5,6,7,8];

}

