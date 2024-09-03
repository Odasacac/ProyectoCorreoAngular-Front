import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DatoscompartidosService } from '../../servicios/datoscompartidos/datoscompartidos.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../otros/angularmaterial/angularmaterial.module';

@Component({
  selector: 'app-bandejadesalida',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './enviados.component.html',
  styleUrl: './enviados.component.css'
})
export class EnviadosComponent 
{

  private datosCompartidos = inject(DatoscompartidosService);

  public usuarioLogueado: boolean = false;
  private router = inject(Router);

  private subscriptions: Subscription = new Subscription();

  private idUsuarioLogueado: number | null = null;

  ngOnInit(): void {
    // Subscribe to the idUsuario observable
    const idUsuarioSubscription = this.datosCompartidos.idUsuario$.subscribe(id => {
      this.idUsuarioLogueado = id;
      this.updateUserStatus();
    });

    // Add subscription to the subscriptions list for cleanup
    this.subscriptions.add(idUsuarioSubscription);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  private updateUserStatus(): void {
    // Update the user status based on idUsuarioLogueado
    if (this.idUsuarioLogueado !== null && this.idUsuarioLogueado !== 0) {
      this.usuarioLogueado = true;
    } else {
      this.usuarioLogueado = false;
    }
  }





  goToLogIn()
  {
    this.router.navigate(['/login']);
  }


}
