import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../angularmaterial/angularmaterial.module';
import { RedactarMensajesComponent } from '../redactarmensajes/redactarmensajes.component';

@Component({
  selector: 'app-leermensajes',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './leermensajes.component.html',
  styleUrl: './leermensajes.component.css'
})
export class LeerMensajesComponent 
{
  private dialogRef=inject(MatDialogRef);
  private dialog=inject(MatDialog);
  public data = inject (MAT_DIALOG_DATA); //Esto es para poder recibir los datos
  //Peero hay que extraerlos, porque estan en formato objeto
  public nombre=this.data.nombre;
  public fecha=this.data.fecha;
  public correo = this.data.correo;
  public contenido=this.data.contenido;
  public id=this.data.id;


  closeDialog() 
{
  this.dialogRef.close();
}

responder()
{
  this.dialog.open(RedactarMensajesComponent, {data: {id:this.id, correo:this.correo}});
  this.dialogRef.close();
}


}
