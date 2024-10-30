import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatoscompartidosService } from '../../servicios/datoscompartidos/datoscompartidos.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario-general';
import { MensajeBE } from '../../interfaces/mensaje-bandeja-entrada';


import { MaterialModule } from '../../otros/angularmaterial/angularmaterial.module';
import { MatTableDataSource } from '@angular/material/table';
import { MensajesService } from '../../servicios/mensajes/mensajes.service';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { LeerMensajesComponent } from '../../otros/leermensajes/leermensajes.component';
import { MatDialog } from '@angular/material/dialog';
import { RedactarMensajesComponent } from '../../otros/redactarmensajes/redactarmensajes.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bandejadeentrada',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './bandejadeentrada.component.html',
  styleUrls: ['./bandejadeentrada.component.css']
})
export class BandejadeentradaComponent implements OnInit, OnDestroy 
{

  private mensajesService = inject(MensajesService);

  private usuariosService = inject(UsuariosService);
  public verId:boolean=false;
  private dialog = inject(MatDialog);
  
  private datosCompartidos = inject(DatoscompartidosService);

  public usuarioLogueado: boolean = false;
  private router = inject(Router);
  private subscripcion: Subscription = new Subscription()
  private idUsuarioLogueado: number|null=0;

  public displayedColumns: string[] = ['fechaEnvio', 'nombreEmisor', 'acciones'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
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
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void 
  {
    this.subscripcion.unsubscribe();
  }



  redactarMensaje()
  {
    this.dialog.open(RedactarMensajesComponent, {data: {id:this.idUsuarioLogueado}});
  }

   leerMensaje(mensaje: any)
  {
    const nombreEmisor = mensaje.nombreEmisor;
    const fechaEnvio = mensaje.fechaEnvio;
    const contenido = mensaje.contenido;
    const correo = mensaje.correoEmisor;

    this.dialog.open(LeerMensajesComponent , {data: {nombre:nombreEmisor, fecha: fechaEnvio, contenido: contenido, correo: correo, id:this.idUsuarioLogueado}});  
  }

  refresh()
  {
    this.actualizarListaDeMensajes();
  }

  irAEnviados()
  {
    this.router.navigate(['/enviados']);
  }

  actualizarListaDeMensajes() 
  {
    this.mostrarMensajes();
  }

  goToLogIn()
  {
    this.router.navigate(['/login']);
  }












  mostrarMensajes(): void 
  {

    const observerMensajes =
    {
      next: (respuestaMensajes:any) =>
      {
       
        const mensajesBE: MensajeBE[] = [];
        let mensajesProcesados = 0;
        const totalMensajes = respuestaMensajes.mensajes.length;

        respuestaMensajes.mensajes.forEach((mensaje:any) =>
        {
          
          const observerNombreEmisor =
          {
            next: (respuestaUsuarios:any) => 
            {

              mensajesBE.push({
                id: mensaje.id,
                fechaEnvio: mensaje.fechaEnvio,
                nombreEmisor: respuestaUsuarios.usuarios[0].nombre,
                contenido: mensaje.contenido,
                correoEmisor: respuestaUsuarios.usuarios[0].correo.toLowerCase()
              });

              mensajesProcesados++;

              if (mensajesProcesados === totalMensajes)
              {
                this.dataSource = new MatTableDataSource(mensajesBE);
              }   
            }
          };
          this.usuariosService.getUsuarioPorId(mensaje.emisorId).subscribe(observerNombreEmisor);
        });
      }
    }
    this.mensajesService.buscarMensajePorReceptorId(this.idUsuarioLogueado!).subscribe(observerMensajes); 
  }












}








