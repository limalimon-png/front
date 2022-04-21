export interface Respuesta {
    ok:    boolean;
    pagina:number;
    posts: Post[];
}
export interface RespuestaPerfil {
    ok:    boolean;
    posts: Post[];
    userId:string
}
export interface iconoPerfil {
    ok:    boolean;
    imagen: string;
    userId:string
}

export interface Post {
    _id?:     string;
    mensaje?: string;
    img?:     string[];
    coords?:  string;
    usuario?: Usuario;
    created?: Date;
    __v?:     number;
    guardado?:boolean;
}


export interface Usuario {
    _id?:     string;
    nombre?:  string;
    imagen?:  string;
    email?:   string;
    __v?:     number;
    password?:string;
}


