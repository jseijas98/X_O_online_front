import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsuarioServiceService } from '../usuario-service.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cambiar-nombre',
  standalone: true,
  imports:[FormsModule,RouterModule],
  templateUrl: './cambiar-nombre.component.html',
  styleUrl: './cambiar-nombre.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CambiarNombreComponent {

  usuarioServices=inject(UsuarioServiceService);
  router = inject(Router);


  cambiarNombre(nombre:string){
    this.usuarioServices.nombre.set(nombre);
  }

  cambiarNombreVolver(nuevoNombre:string){
    this.usuarioServices.nombre.set(nuevoNombre);
    this.router.navigate(['/']);
    }
    

}
