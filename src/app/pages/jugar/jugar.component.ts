import { Component, computed, effect, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerService } from '../../services/server-services/server.service';
import { UsuarioServiceService } from '../usuario-service.service';
import { TableroComponent } from '../../components/tablero/tablero.component';
import { MarcadorComponent } from '../../components/marcador/marcador.component';
import { SalasService } from '../../services/salas-service/salas.service';
import { ModalFullscreenComponent } from "../../components/modal-fullscreen/modal-fullscreen.component";
import { EstadoJuego } from '../../types';
import { CommonModule, Location } from '@angular/common';
import { timer } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-jugar',
  standalone: true,
  templateUrl: './jugar.component.html',
  styleUrls: ['./jugar.component.scss'],
  imports: [RouterModule, TableroComponent, MarcadorComponent, ModalFullscreenComponent, CommonModule],
})
export class JugarComponent implements OnInit,OnDestroy {


  private intervalId: any;

  ngOnDestroy() {
    clearInterval(this.intervalId); // Limpia el intervalo al destruir el componente
  }

  ngOnInit() {

    this.location.replaceState("/jugar");
    if (this.isPrivate() && !this.id()) {
      this.salasServices.crearSala()
    } else if (this.id()) {
      console.log("intentando unirse sala", this.id());

      this.salasServices.unirseALaSala(parseInt(this.id()!))
    } else {
      this.salasServices.crearSala(true)
    }
  }


  timer = computed(()=> this.salasServices.timer()! / 1000);

  tiempo = signal<number|undefined>(undefined);


  mostrarModal = computed(()=> this.tineModal.includes(this.salasServices.state()));


  isPrivate = input()
  id = input<string>()

  salasServices = inject(SalasService);
  usuarioService = inject(UsuarioServiceService);
  serverService = inject(ServerService)
  location = inject(Location)
  tineModal: EstadoJuego[] = ["ABANDONADO", "EMPATE", "ESPERANDO_COMPAÑERO", "VICTORIA_FINAL_P1", "VICTORIA_FINAL_P2", "VICTORIA_P1", "VICTORIA_P2", "CANCELADA","REMATCH"]



  loaderText: string = "Esperando jugador...";

  estadoAnterior = signal<EstadoJuego>("ESPERANDO_COMPAÑERO");


  cambiarEstadoAnterior = effect(() => {
    if (this.salasServices.state()) {
      this.estadoCambioHaceMucho = false;
      setTimeout(() => {
        this.estadoAnterior.set(this.salasServices.state());
        this.estadoCambioHaceMucho = true;
      }, 300)
    }
  }, { allowSignalWrites: true });
  linkCopiado = signal<boolean>(false);
  estadoCambioHaceMucho = true;



  nuevaRonda() {
    setTimeout(() => {
      this.salasServices.nuevaRonda();
    }, 1500);
  }

  efectoVictoriaNoDefinitiva = effect(() => {
    const estadoActual = this.salasServices.state();
    if (estadoActual === "VICTORIA_P1" || estadoActual === "VICTORIA_P2" || estadoActual === "EMPATE") {
      this.nuevaRonda();
    }
  });

  cancelarSala() {
    this.salasServices.cancelarSala();
  }


  copiarLink() {
    navigator.clipboard.writeText(environment.CLIENT_URL + "/jugar/" + this.salasServices.id());
    this.linkCopiado.set(true);
    setTimeout(() => this.linkCopiado.set(false), 2000);
  }


  aceptarRematch() {
    this.salasServices.signalRematch.set(true);
    this.salasServices.revancha();
  }

}


