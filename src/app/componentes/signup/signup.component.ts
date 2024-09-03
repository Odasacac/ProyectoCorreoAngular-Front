import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../otros/angularmaterial/angularmaterial.module';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent 
{
  public formulario!: FormGroup;
  private fb = inject(FormBuilder);
  private servicio = inject(UsuariosService);
  private router = inject(Router);


  public contrasenyasNoCoinciden: boolean = false;
  public correoExistente: boolean = false;
  public errorAlAlmacenar: boolean = false;
  public errorAlAlmacenarFromBack: boolean = false;
  ngOnInit(): void 
  {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenya: ['', Validators.required],
      contrasenyaR: ['', Validators.required]
    });
  }




  onSubmit() 
  {
    this.contrasenyasNoCoinciden = false;
    this.correoExistente = false;
    this.errorAlAlmacenar = false;
    this.errorAlAlmacenarFromBack = false;

    if (this.formulario.valid) {
      const fechaActual = new Date();
      
      const data = 
      {
        nombre: this.formulario.get('nombre')?.value,
        correo: this.formulario.get('correo')?.value,
        contrasenya: this.formulario.get('contrasenya')?.value,
        contrasenyaR: this.formulario.get('contrasenyaR')?.value,
        fechaCreacion: fechaActual.toISOString(),
        esAdmin: false
      };

      if (data.contrasenya != data.contrasenyaR)
      {
          this.contrasenyasNoCoinciden=true;
      }

      else
      {
        this.servicio.guardarUsuario(data)
        .subscribe(
          (response) => {
            if (response === "El correo ya existe.") 
            { 
              this.correoExistente=true;
            } 
            else if (response === "Error al almacenar el usuario.") 
            {
              this.errorAlAlmacenarFromBack = true;
            } else if (response === "Usuario almacenado correctamente.") 
            {  
              this.router.navigate(['/login']);             
            }
            else{
             
            }
          },
          (error) => {
            console.error('Error de login: ', error);
            this.errorAlAlmacenar = true;
          }
        );
      }    
    }
  }


  goToLogIn()
  {
    this.router.navigate(['/login']);
  }

  

}
