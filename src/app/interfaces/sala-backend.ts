import { EstadoJuego } from "../types"
import { Jugador } from "./jugador"


export interface SalaBackend {
    publica : boolean,
    jugadores : [Jugador,Jugador],
    id : number
    estado: EstadoJuego,
    tablero:Tablero
    posicionGanadora: PosicionGanadora | undefined
    timer?: number
    rematchAvailable: boolean,
    rematch?: boolean
  }
  
  export type PosicionTablero = 0|1|2|3|4|5|6|7|8;
  export type Tablero = [NumeroJugador|"",NumeroJugador|"",NumeroJugador|"",NumeroJugador|"",NumeroJugador|"",NumeroJugador|"",NumeroJugador|"",NumeroJugador|"",NumeroJugador|""];
  export type NumeroJugador = 1|2;
  export type PosicionGanadora = [PosicionTablero,PosicionTablero,PosicionTablero];