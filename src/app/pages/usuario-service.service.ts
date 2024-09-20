import { effect, Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor() {

    const nombreLocalStorage = localStorage.getItem('nombre')
    if (nombreLocalStorage) this.nombre.set(nombreLocalStorage);
  }

  nombre = signal<string | undefined>("");

  guardarNombreLocalStorage = effect(() => {
    localStorage.setItem('nombre', this.nombre() || '');
    console.log(this.nombre());
  });
}