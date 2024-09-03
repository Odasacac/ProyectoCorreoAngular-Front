import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../../otros/angularmaterial/angularmaterial.module';
import { Subscription } from 'rxjs';
import { DatoscompartidosService } from '../../servicios/datoscompartidos/datoscompartidos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

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
  private subscriptions: Subscription = new Subscription();
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() 
  {  
    const idUsuarioSubscription = this.datosCompartidos.idUsuario$.subscribe(id => {
      this.idUsuarioLogueado = id;
      this.loginCorrecto = id !== null && id !== 0; // Actualizar loginCorrecto basado en el id
    });
  
    this.subscriptions.add(idUsuarioSubscription);

  }

  ngOnDestroy() 
  {   
    this.subscriptions.unsubscribe();
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
    this.datosCompartidos.setIdUsuario(0);
    this.loginCorrecto = false;
    console.log('Login correcto:', this.loginCorrecto); // Verifica si cambia a false
    this.router.navigate(['/login']).then(() => {
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }
  
}
