import { Usuario } from '../models/usuario.model';

export interface LoadUsuario {
    total: number;
    usuarios: Usuario[];
}