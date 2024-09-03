import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../otros/angularmaterial/angularmaterial.module';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';


import { Router } from '@angular/router';
import { DatoscompartidosService } from '../../servicios/datoscompartidos/datoscompartidos.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formulario!: FormGroup;
  private fb = inject(FormBuilder);
  private servicio = inject(UsuariosService);
  private router = inject(Router);
  private datosCompartidos = inject(DatoscompartidosService);

  public correoNoExiste: boolean = false;
  public contrasenyaErronea: boolean = false;


  ngOnInit(): void {
    this.crearFormulario();
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

    if (this.formulario.valid) {
      const data = {
        nombre: null,
        contrasenya: this.formulario.get('contrasenya')?.value,
        correo: this.formulario.get('correo')?.value,
        fechaCreacion: null,
        esAdmin: null
      };

      this.servicio.comprobarLogIn(data)
        .subscribe(
          (response) => {
            if (response.respuesta === "LogIn correcto.") 
            { 
              this.datosCompartidos.setIdUsuario(response.usuarios[0].id);
              this.datosCompartidos.setNombreUsuario(response.usuarios[0].nombre);
              this.datosCompartidos.setContrasenyaUsuario(response.usuarios[0].contrasenya);
              this.datosCompartidos.setEsAdminUsuario(response.usuarios[0].esAdmin);
              this.router.navigate(['/bandejadeentrada']);

            } 
            else if (response.respuesta === "El usuario no existe.") {
              this.correoNoExiste = true;
            } else if (response.respuesta === "LogIn incorrecto.") {
              this.contrasenyaErronea = true;
            }
          },
          (error) => {
 
            this.correoNoExiste = true; // O alguna otra lógica de manejo de errores
          }
        );
        
    }
  }
}
