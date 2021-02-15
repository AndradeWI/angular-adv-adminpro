import { Hospital } from './hospital.model';

interface _MedicolUser {
    _id: string;
    name: string;
    img: string;
}

export class Medico {

constructor(
    public _id: string,
    public name?: string,
    public img?: string,
    public usuario?: _MedicolUser,
    public hospital?: Hospital
) {}


}