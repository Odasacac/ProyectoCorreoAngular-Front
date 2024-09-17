
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class UsuariosService {
  private http = inject(HttpClient);
  private base_url: string = "http://localhost:8080/api/v1";

  
  comprobarLogIn(body: any): Observable<any> 
  {
    const endpoint = `${this.base_url}/usuarios/login`;
    return this.http.post<any>(endpoint, body);
  }

  guardarUsuario(body: any): Observable<any> {
    const endpoint = `${this.base_url}/usuarios`;
    return this.http.post(endpoint, body);
  }

  getUsuarioPorId(id: number): Observable<any> 
  {
    const endpoint = `${this.base_url}/usuarios/${id}`;
    return this.http.get<any>(endpoint);
  }

  getUsuarioPorCorreo(correo: string): Observable<any> 
  {
    const endpoint = `${this.base_url}/usuarioscorreo/${correo}`;
    return this.http.get<any>(endpoint)     
  }
  

  
}


