import { Component, inject, ViewChild } from '@angular/core';
import { DatoscompartidosService } from '../../servicios/datoscompartidos/datoscompartidos.service';
import { Usuario } from '../../interfaces/usuario-general';
import { Subscription } from 'rxjs';
import { MensajesService } from '../../servicios/mensajes/mensajes.service';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MensajeEnviados } from '../../interfaces/mensaje-enviados';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../otros/angularmaterial/angularmaterial.module';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LeermensajesenviadosComponent } from '../../otros/leermensajesenviados/leermensajesenviados.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-enviados',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './enviados.component.html',
  styleUrl: './enviados.component.css'
})
export class EnviadosComponent 
{
  public usuarioLogueado: boolean = false;
  private datosCompartidos = inject(DatoscompartidosService);
  private idUsuarioLogueado: number|null=0;
  private subscripcion: Subscription = new Subscription()

  private mensajesService = inject(MensajesService);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['fechaEnvio', 'nombreReceptor', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void 
  {
    this.usuarioLogueado=false;
    const usuarioObserver = 
    {
      next: (usuario: Usuario) =>
      {
        const usuarioObservado = this.datosCompartidos.getUsuario();
        if(usuarioObservado!.id != 0)
        {
          this.usuarioLogueado=true;
          this.idUsuarioLogueado=usuarioObservado!.id;
          this.mostrarMensajes();
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

  ngOnDestroy(): void 
  {
    this.subscripcion.unsubscribe();
  }

  eliminarMensaje(mensaje: any) 
  {   

    const observableEliminar =
    {
      next: (respuesta:any) => 
      {
        this.actualizarListaDeMensajes();
      },
      error: (error: any) => 
      {
        this.actualizarListaDeMensajes();  
        console.log("Error, mensaje no eliminado");
        
      }
    }

    this.mensajesService.enviarAPapelera(mensaje.id).subscribe(observableEliminar);
    this.dataSource.paginator = this.paginator;
  }



  leerMensaje(mensaje: any)
  {
    const nombreReceptor = mensaje.nombreReceptor;
    const fechaEnvio = mensaje.fechaEnvio;
    const contenido = mensaje.contenido;
    const correo = mensaje.correoReceptor;

    this.dialog.open(LeermensajesenviadosComponent , {data: {nombre:nombreReceptor, fecha: fechaEnvio, contenido: contenido, correo: correo, id:this.idUsuarioLogueado}});  
  }

  actualizarListaDeMensajes() 
  {
    this.mostrarMensajes();
  }
  goToLogIn()
  {
    this.router.navigate(['/login']);
  }
  irABandejaDeEntrada()
  {
    this.router.navigate(['/bandejadeentrada']);
  }
  refresh()
  {
    this.actualizarListaDeMensajes();
  }



  mostrarMensajes(): void 
  {

    const observerMensajes =
    {
      next: (respuestaMensajes:any) =>
      {
       
        const mensajesBE: MensajeEnviados[] = [];
        let mensajesProcesados = 0;
        const totalMensajes = respuestaMensajes.mensajes.length;

        respuestaMensajes.mensajes.forEach((mensaje:any) =>
        {
          
          const observerNombreReceptor =
          {
            next: (respuestaUsuarios:any) => 
            {

              mensajesBE.push({
                id: mensaje.id,
                fechaEnvio: mensaje.fechaEnvio,
                nombreReceptor: respuestaUsuarios.usuarios[0].nombre,
                contenido: mensaje.contenido,
                correoReceptor: respuestaUsuarios.usuarios[0].correo.toLowerCase()
              });

              mensajesProcesados++;

              if (mensajesProcesados === totalMensajes)
              {
                this.dataSource = new MatTableDataSource(mensajesBE);
              }   
            }
          };
          this.usuariosService.getUsuarioPorId(mensaje.receptorId).subscribe(observerNombreReceptor);
        });
      }
    }
    this.mensajesService.buscarMensajePorEmisorId(this.idUsuarioLogueado!).subscribe(observerMensajes); 
  }


}
