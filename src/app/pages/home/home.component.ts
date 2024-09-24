import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioServiceService } from '../usuario-service.service';
import { ServerService } from '../../services/server-services/server.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterModule],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  usuarioServices=inject(UsuarioServiceService)
  serverServices = inject(ServerService)
  router = inject(Router)


   /** Pregunta al servidor si hay una sála pública disponible */
   buscarSalaPublica(){
    this.serverServices.server.emitWithAck("encontrarSala").then(res => {
      // console.log(res)
      if(res === null) return this.router.navigate(["/jugar"]);
      return this.router.navigate(["/jugar",res]);
    })
  }

}
