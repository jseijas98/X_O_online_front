import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SalasService } from '../../services/salas-service/salas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marcador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marcador.component.html',
  styleUrl: './marcador.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarcadorComponent {

  salasServices = inject(SalasService)

  vidasPlayer1 = computed(() => new Array(this.salasServices.player1().vidas));
  vidasPlayer2 = computed(() => new Array(this.salasServices.player2().vidas));

}
