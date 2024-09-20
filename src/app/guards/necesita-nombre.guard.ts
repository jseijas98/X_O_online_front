import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { UsuarioServiceService } from '../pages/usuario-service.service';
import { inject } from '@angular/core';

export const necesitaNombreGuard: CanActivateFn = (route, state) => {
  const usuarioServices = inject(UsuarioServiceService);
  const router = inject(Router);
  if (usuarioServices.nombre()) return true;
  const  UrlTree = router.parseUrl('/cambiar-nombre');
  return new RedirectCommand( UrlTree,{skipLocationChange: true});
};
