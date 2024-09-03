import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatoscompartidosService {

  private idUsuarioSubject = new BehaviorSubject<number | null>(null);
  idUsuario$ = this.idUsuarioSubject.asObservable();
  setIdUsuario(id: number) 
  {
    this.idUsuarioSubject.next(id);
  }
  getIdUsuario(): number | null 
  {
    return this.idUsuarioSubject.value;
  }

  
  private nombreUsuarioSubject = new BehaviorSubject<string | null>(null);
  nombreUsuario$ = this.nombreUsuarioSubject.asObservable();
  setNombreUsuario(nombre: string) 
  {
    this.nombreUsuarioSubject.next(nombre);
  }
  getNombreUsuario(): string | null 
  {
    return this.nombreUsuarioSubject.value;
  }


  private contrasenyaUsuarioSubject = new BehaviorSubject<string | null>(null);
  contrasenyaUsuario$ = this.contrasenyaUsuarioSubject.asObservable();
  setContrasenyaUsuario(contrasenya: string) 
  {
    this.contrasenyaUsuarioSubject.next(contrasenya);
  }
  getContrasenyaUsuario(): string | null 
  {
    return this.contrasenyaUsuarioSubject.value;
  }


  private esAdminUsuarioSubject = new BehaviorSubject<boolean | null>(null);
  esAdminUsuario$ = this.esAdminUsuarioSubject.asObservable();
  setEsAdminUsuario(esAdmin: boolean) 
  {
    this.esAdminUsuarioSubject.next(esAdmin);
  }
  getEsAdminUsuario(): boolean | null 
  {
    return this.esAdminUsuarioSubject.value;
  }





}
