import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../otros/angularmaterial/angularmaterial.module';
import { UsuarioParaSignUp } from '../../interfaces/usuario-signup';
import { Subscription } from 'rxjs';



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
  private subscripcion: Subscription = new Subscription();

  public contrasenyasNoCoinciden: boolean = false;
  public correoExistente: boolean = false;
  public errorAlAlmacenar: boolean = false;
  public errorAlAlmacenarFromBack: boolean = false;
  ngOnInit(): void 
  {
    this.crearFormulario();
  }

  ngOnDestroy() 
  {   
    this.subscripcion.unsubscribe();
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

    if (this.formulario.valid) 
      {
      const fechaActual = new Date();
      

      if (this.formulario.get('contrasenya')?.value != this.formulario.get('contrasenyaR')?.value)
      {
          this.contrasenyasNoCoinciden=true;
      }

      else
      {

        const usuarioAAlmacenar: UsuarioParaSignUp = 
        {
          nombre: this.formulario.get('nombre')?.value,
          correo: this.formulario.get('correo')?.value,
          contrasenya: this.formulario.get('contrasenya')?.value,
        };

        const usuarioObserver = 
        {
          next: (response: any) =>
          {
            if (response.respuesta === "El correo ya existe.") 
              { 
                this.correoExistente=true;
              } 
              else if (response.respuesta === "Error al almacenar el usuario.") 
              {
                this.errorAlAlmacenarFromBack = true;
              } 
              else if (response.respuesta === "Usuario guardado correctamente.") 
              {  
                this.goToLogIn();            
              }
              else{
               
              }
          },
          error: (error: any) =>
          {
            console.log("Error: " + error)
            this.errorAlAlmacenar = true;
          },
          complete: () =>
          {
  
          }
        }
        this.subscripcion=this.servicio.guardarUsuario(usuarioAAlmacenar).subscribe(usuarioObserver);
      }    
    }
  }


  goToLogIn()
  {
    this.router.navigate(['/login']);
  }

  

}
