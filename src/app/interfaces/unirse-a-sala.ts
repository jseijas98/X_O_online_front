import { Jugador } from "./jugador";

export interface unirseALaSalaArgs {
    id: number;
    nombreJugador: string;
}

export interface RematchArgs {
    salaId: number,
    jugador: 1 | 2,
    rematch: boolean|undefined
}