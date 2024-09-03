import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../angularmaterial/angularmaterial.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MensajesService } from '../../servicios/mensajes/mensajes.service';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-redactarmensajes',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './redactarmensajes.component.html',
  styleUrl: './redactarmensajes.component.css'
})
export class RedactarMensajesComponent implements OnInit
{
  private dialogRef=inject(MatDialogRef);
  public data = inject (MAT_DIALOG_DATA);
  public emisorId: number = this.data.id;
  private correo: string = this.data.correo;
  public errorAlEnviar: boolean = false;

  public formulario!: FormGroup;
  private fb = inject(FormBuilder);
  private receptorIdFinal:number=0;
  private servicio = inject(MensajesService);
  private servicioUser = inject(UsuariosService);
  


  ngOnInit(): void 
  {
    this.crearFormulario();
  }




  crearFormulario()
{
  this.formulario = this.fb.group({

    destinatario: [this.correo,[Validators.required, Validators.email]], 
    contenido: ['', Validators.required]
  });
}














onSubmit() 
{
  this.errorAlEnviar = false;

  if (this.formulario.valid) 
  {
    // Obtener el usuario por correo
    this.servicioUser.getUsuarioPorCorreo(this.formulario.get('destinatario')?.value).subscribe(response => 
    {
        console.log(response.usuarios);

        if (response.usuarios && response.usuarios.length > 0) 
        {

          this.receptorIdFinal = response.usuarios[0].id.toString();

          // Preparar los datos para enviar el mensaje
          const data = 
          {    
          contenido: this.formulario.get('contenido')?.value, 
          emisorId: this.emisorId,
          receptorId: this.receptorIdFinal,
          fechaEnvio: null,
          deAdmin: null,
          estaEnPapelera: false
          };

          // Enviar el mensaje
          this.servicio.enviarMensaje(data).subscribe(response => 
          {
            
              if (response.respuesta === "Mensaje guardado correctamente.") 
                { 
                  this.errorAlEnviar = false;
                  this.closeDialog();
                } 
                else 
                {
                  this.errorAlEnviar = true;
                }
          },
          (error) => 
          {
            console.error('Error de envío de mensaje:', error);
            this.errorAlEnviar = true;
          }
          );
        } 
        else 
        {
          console.error('No se encontró el usuario o la respuesta está vacía');
          this.errorAlEnviar = true;
        }
      },
      (error) => 
      {
        console.error('Error al obtener el usuario:', error);
        this.errorAlEnviar = true;
      }
      );
  }
}





















reiniciarFormulario()
{
  this.formulario.reset(); //No es lo mismo llamar al funcion reset que crear de nuevo el formulario, para mi si lo es pero vaya que es mejor hacer el reset
}

closeDialog() 
{
  this.dialogRef.close();
}

}
