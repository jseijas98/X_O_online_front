import { inject, Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { UsuarioServiceService } from '../../pages/usuario-service.service';
import { Subject } from 'rxjs';
import { SalaBackend } from '../../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  server = io(environment.SERVER_URL, { autoConnect: false });

  usuarioService = inject(UsuarioServiceService);
  upateSala$ = new Subject<SalaBackend>();

  constructor() {
    this.server.on("connect", () => {
      // console.log("conectado al socket");
    });
    this.server.on("sala", (args) => {
      // console.log("sala", args);
      this.upateSala$.next(args)

    })
    this.server.connect();
  }

}
