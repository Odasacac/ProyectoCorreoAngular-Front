import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../angularmaterial/angularmaterial.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leermensajesenviados',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './leermensajesenviados.component.html',
  styleUrl: './leermensajesenviados.component.css'
})
export class LeermensajesenviadosComponent 
{
  private dialogRef=inject(MatDialogRef);
  private dialog=inject(MatDialog);
  public data = inject (MAT_DIALOG_DATA);

  public nombre=this.data.nombre;
  public fecha=this.data.fecha;
  public correo = this.data.correo;
  public contenido=this.data.contenido;
  public id=this.data.id;

  
  closeDialog() 
{
  this.dialogRef.close();
}


}
