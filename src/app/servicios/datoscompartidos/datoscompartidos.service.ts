import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class DatoscompartidosService 
{

  private usuarioInicial: Usuario = 
  {
    id: 0,
    nombre: '',
    contrasenya: '',
    correo: '',
    fechaCreacion: new Date().toISOString(),
    esAdmin: false
  };

  private usuarioSubject = new BehaviorSubject<Usuario>(this.usuarioInicial);
  
  usuario$ = this.usuarioSubject.asObservable();

  setUsuario(usuario: Usuario) 
  {
    this.usuarioSubject.next(usuario);
  }
  getUsuario(): Usuario | null 
  {
    return this.usuarioSubject.value;
  }
  resetUsuario()
  {
    this.setUsuario(this.usuarioInicial);
  }


}
