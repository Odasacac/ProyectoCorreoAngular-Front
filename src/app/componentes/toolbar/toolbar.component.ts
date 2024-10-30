import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../../otros/angularmaterial/angularmaterial.module';
import { Subscription } from 'rxjs';
import { DatoscompartidosService } from '../../servicios/datoscompartidos/datoscompartidos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../interfaces/usuario-general';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatToolbarModule, MatMenuModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'] 
})
export class ToolbarComponent implements OnInit, OnDestroy {

  public verPruebas:boolean=true;


  public loginCorrecto: boolean = false;
  private idUsuarioLogueado: number | null = null;
  

  private datosCompartidos = inject(DatoscompartidosService);
  private subscripcion: Subscription = new Subscription()
  private router = inject(Router);

  ngOnInit() 
  {  
      const usuarioObserver = 
      {
        next: (usuario: Usuario) =>
        {
          const usuarioObservado = this.datosCompartidos.getUsuario();
          if(usuarioObservado!.id != 0)
          {
            this.loginCorrecto=true;
          }
        },
        error: (error: any) =>
        {

        },
        complete: () =>
        {

        }
      }
      this.subscripcion=this.datosCompartidos.usuario$.subscribe(usuarioObserver);
  }

  ngOnDestroy() 
  {   
    this.subscripcion.unsubscribe();
  }


  goToBandejaDeEntrada()
  {
    this.router.navigate(['/bandejadeentrada']);
  }

  goToBandejaDeSalida()
  {
    this.router.navigate(['/bandejadesalida']);
  }

  goToPapelera()
  {
    this.router.navigate(['/papelera']);
  }


  logout() 
  {
    this.datosCompartidos.resetUsuario();
    this.loginCorrecto = false;
    this.router.navigate(['/login']);
  }
  
}
