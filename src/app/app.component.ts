import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BotoneraComponent } from "./components/botonera/botonera.component";
import { HomeComponent } from "./pages/home/home.component";
import { ServerService } from './services/server-services/server.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BotoneraComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'la-vieja-online';


  server = inject(ServerService);


}
