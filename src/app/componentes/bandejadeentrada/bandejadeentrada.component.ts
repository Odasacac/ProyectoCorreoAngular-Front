import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DatoscompartidosService } from '../../servicios/datoscompartidos/datoscompartidos.service';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


import { MaterialModule } from '../../otros/angularmaterial/angularmaterial.module';
import { MatTableDataSource } from '@angular/material/table';
import { MensajesService } from '../../servicios/mensajes/mensajes.service';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { LeerMensajesComponent } from '../../otros/leermensajes/leermensajes.component';
import { MatDialog } from '@angular/material/dialog';
import { RedactarMensajesComponent } from '../../otros/redactarmensajes/redactarmensajes.component';


@Component({
  selector: 'app-bandejadeentrada',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './bandejadeentrada.component.html',
  styleUrls: ['./bandejadeentrada.component.css']
})
export class BandejadeentradaComponent implements OnInit, OnDestroy {

  private mensajesService = inject(MensajesService);

  private usuariosService = inject(UsuariosService);
  public verId:boolean=false;
  private dialog = inject(MatDialog);
  
  private datosCompartidos = inject(DatoscompartidosService);

  public usuarioLogueado: boolean = false;
  private router = inject(Router);
  private subscriptions: Subscription = new Subscription();
  private idUsuarioLogueado: number | null = null;

  public displayedColumns: string[] = ['fechaEnvio', 'nombreEmisor', 'acciones'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();


  ngOnInit(): void 
  {
    const idUsuarioSubscription = this.datosCompartidos.idUsuario$.subscribe(id => {
      this.idUsuarioLogueado = id;
      this.updateUserStatus();

      if (this.usuarioLogueado) {
        this.mostrarMensajes();
      }

    });


    this.subscriptions.add(idUsuarioSubscription);
  }

  ngOnDestroy(): void 
  {
    this.subscriptions.unsubscribe();
  }

  private updateUserStatus(): void {
    // Update the user status based on idUsuarioLogueado
    if (this.idUsuarioLogueado !== null && this.idUsuarioLogueado !== 0) 
    {
      this.usuarioLogueado = true;
    }
    else 
    {
      this.usuarioLogueado = false;
  
    }
  }


redactarMensaje()
{
  this.dialog.open(RedactarMensajesComponent, {data: {id:this.idUsuarioLogueado}});
}

  mostrarMensajes(): void {
    if (this.idUsuarioLogueado) {
      const mensajesSubscription = this.mensajesService.mostrarBandejaEntrada(this.idUsuarioLogueado).pipe(
        switchMap((response: { mensajes: Mensaje[] }) => {
          // Obtener una lista de observables para obtener el nombre y correo de cada emisor
          const observables = response.mensajes.map((mensaje: Mensaje) => 
            this.usuariosService.getUsuarioPorIdParaTabla(mensaje.emisorId).pipe(
              map(usuario => ({ ...mensaje, nombreEmisor: usuario.nombre, correoEmisor: usuario.correo }))
            )
          );
          // Ejecutar todas las solicitudes concurrentemente
          return forkJoin(observables);
        })
      ).subscribe(
        (mensajesConDatos: Mensaje[]) => {
          this.dataSource.data = mensajesConDatos;
        },
        error => {
          console.error('Error al cargar los mensajes', error);
        }
      );
      this.subscriptions.add(mensajesSubscription);
    }
  }
  
  















  leerMensaje(nombre: string, fecha: string, contenido: string, correo: string)
{
  this.dialog.open(LeerMensajesComponent , {data: {nombre:nombre, fecha: fecha, contenido: contenido, correo: correo,id:this.idUsuarioLogueado}});  
}


refresh()
{
  this.actualizarListaDeMensajes();
}




  eliminarMensaje(mensaje: any) {
    
    this.mensajesService.enviarAPapelera(mensaje.id).subscribe({
      next: (respuesta) => {
        this.actualizarListaDeMensajes();
      },
      error: (error) => {
        console.error('Error al mover el mensaje a la papelera:', error);
        this.actualizarListaDeMensajes();  
      }
      
    });
  }

  actualizarListaDeMensajes() {
    this.mostrarMensajes();
  }

  goToLogIn()
  {
    this.router.navigate(['/login']);
  }

}

interface Mensaje {
  id: number;
  fechaEnvio: string;
  emisorId: number;
  nombreEmisor?: string;
  correoEmisor?: string;
}
