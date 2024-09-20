import { inject, Injectable, signal } from '@angular/core';
import { EstadoJuego } from '../../types/estado-de-juego';
import { CrearSalaArgs, Jugador, PosicionGanadora, PosicionTablero, RematchArgs, SalaBackend, Tablero, unirseALaSalaArgs } from '../../interfaces';
import { ServerService } from '../server-services/server.service';
import { UsuarioServiceService } from '../../pages/usuario-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  serverService = inject(ServerService);
  usuarioService = inject(UsuarioServiceService);
  router = inject(Router);

  constructor() {

    this.serverService.upateSala$.subscribe((salas) => {
      this.getSalas(salas);
    })

  }

  player1 = signal<Jugador>({ nombre: "", vidas: 0, rematch: undefined });
  player2 = signal<Jugador>({ nombre: "", vidas: 0, rematch: undefined });
  state = signal<EstadoJuego>("ESPERANDO_COMPAÑERO");
  numeroDeJugadores = signal<1 | 2 | undefined>(undefined);

  id = signal<number | undefined>(undefined);
  tablero = signal<Tablero>(["", "", "", "", "", "", "", "", "",]);
  publica = signal<boolean | undefined>(undefined);
  posicionGanadora = signal<PosicionGanadora | undefined>(undefined);
  timer = signal<number | undefined>(undefined);
  signalRematch = signal<boolean|undefined>(undefined);


  getSalas(salas: SalaBackend) {
    if (!salas) this.router.navigate(["/"]);
    if (salas.estado === "CANCELADA"||!salas.estado) this.router.navigate(["/"]);
    if(salas.rematchAvailable)this.revancha()
    if(salas.rematch)this.signalRematch.set(undefined)
    this.state.set(salas.estado);
    this.player1.set(salas.jugadores[0]);
    this.player2.set(salas.jugadores[1]);
    this.tablero.set(salas.tablero);
    this.id.set(salas.id);
    this.publica.set(salas.publica);
    this.posicionGanadora.set(salas.posicionGanadora);
    if (salas.timer){ this.timer.set(salas.timer); }
    else{this.timer.set(0);}
  }

  crearSala(privada: boolean = false) {
    const args: CrearSalaArgs = {
      publica: privada,
      nombreJugador: this.usuarioService.nombre()!
    }
    this.serverService.server.emitWithAck("crearSala", args).then((res) => {
      // console.log("res crear sala", res);
      this.getSalas(res.sala)
      this.numeroDeJugadores.set(1)

    })
  }

  unirseALaSala(id: number) {
    const args: unirseALaSalaArgs = {
      id,
      nombreJugador: this.usuarioService.nombre()!
    }
    this.serverService.server.emitWithAck("unirseASala", args).then((res) => {
      // console.log('res unirse a sala', res);
      this.getSalas(res.sala)
      this.numeroDeJugadores.set(2)
    })
  }

  cancelarSala() {
    const args: unirseALaSalaArgs = {
      id: this.id()!,
      nombreJugador: this.usuarioService.nombre()!
    }
    this.serverService.server.emitWithAck("cancelarSala", args).then((res) => {
      // console.log('res cancelarSala', res);
      this.getSalas(res.sala)
    })
  }

  /** Envia al server la petición de un jugador de hacer una jugada */
  jugar(posicion: PosicionTablero) {
    //console.log("Emitiendo jugada")
    this.serverService.server.emit("jugar", {
      salaId: this.id(),
      jugador: this.numeroDeJugadores(),
      posicion
    })
  }

  /** Envía el server la petición de un jugador de seguir con la siguiente ronda */
  nuevaRonda() {
    this.serverService.server.emit("nuevaRonda", { salaId: this.id() });
  }

  revancha() {
    const args: RematchArgs = {
      salaId: this.id()!,
      jugador: this.numeroDeJugadores()!,
      rematch: this.signalRematch()
    }
    this.serverService.server.emitWithAck("rematch", args).then((res) => {
      // console.log('res rematch', res);
      this.getSalas(res.sala)
    })
  }

  


}
