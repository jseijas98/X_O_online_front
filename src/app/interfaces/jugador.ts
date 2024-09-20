export interface Jugador {
    nombre: string,
    vidas: number,
    rematch?:boolean
  }
  
  export const JUGADOR_VACIO:Jugador = {
    nombre: "",
    vidas: 0,
    rematch:undefined
  }