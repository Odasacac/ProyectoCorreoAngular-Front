import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService 
{

  private http = inject(HttpClient);
  private base_url: string = "http://localhost:8080/api/v1";

  
  buscarMensajePorReceptorId(id: number): Observable<any> 
  {
    const endpoint = `${this.base_url}/mensajesrecibidos/${id}`;
    return this.http.get<any>(endpoint);
  }

    enviarAPapelera (id:number): Observable<any>
    {
      const endpoint = `${this.base_url}/mensajes/${id}`;
      return this.http.put<any>(endpoint, null);
    }

    enviarMensaje (body:any): Observable<any>
    {
        const endpoint = `${this.base_url}/mensajes`;
        return this.http.post<any>(endpoint, body);
    }
}
