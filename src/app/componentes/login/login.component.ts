import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../otros/angularmaterial/angularmaterial.module';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { DatoscompartidosService } from '../../servicios/datoscompartidos/datoscompartidos.service';

import { Usuario } from '../../interfaces/usuario';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{
  public formulario!: FormGroup;
  private fb = inject(FormBuilder);
  private servicio = inject(UsuariosService);
  private router = inject(Router);
  private datosCompartidos = inject(DatoscompartidosService);
  private subscripcion:Subscription = new Subscription();
  

  public correoNoExiste: boolean = false;
  public contrasenyaErronea: boolean = false;


  ngOnInit(): void 
  {
    this.crearFormulario();
  }

  ngOnDestroy(): void 
  {
    this.subscripcion.unsubscribe();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenya: ['', Validators.required]
    });
  }
  goToSignup()
  {
    this.router.navigate(['/signup']);
  }

  onSubmit() {
    this.correoNoExiste = false;
    this.contrasenyaErronea = false;

    if (this.formulario.valid) 
    {
      const usuarioALoguearse: Usuario = 
      {
        id: null,
        nombre: null,
        contrasenya: this.formulario.get('contrasenya')?.value,
        correo: this.formulario.get('correo')?.value,
        fechaCreacion: null,
        esAdmin: null
      };


      const observerALogin =
      {
        next: (response:any) =>
        {
            if (response.respuesta === "LogIn correcto.") 
            { 
              this.datosCompartidos.setUsuario(response.usuarios[0]);
              this.router.navigate(['/bandejadeentrada']);

            } 
            else if (response.respuesta === "El usuario no existe.") 
            {
              this.correoNoExiste = true;
            } 
            else if (response.respuesta === "LogIn incorrecto.") 
            {
              this.contrasenyaErronea = true;
            }
        },
        error: (error:any) => 
        {      
          this.correoNoExiste = true; // O alguna otra lógica de manejo de errores
        }

      }
      this.subscripcion=this.servicio.comprobarLogIn(usuarioALoguearse).subscribe(observerALogin);
        
    }
  }
}
