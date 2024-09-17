export interface Mensaje 
{
    id: number;
    fechaEnvio: string;
    emisorId: number;
    nombreEmisor?: string;
    correoEmisor?: string;
}
