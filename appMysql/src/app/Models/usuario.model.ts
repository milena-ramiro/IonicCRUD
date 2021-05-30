export interface Usuario{
    id?: number,
    nome: string,
    usuario: string,
    senha: string,
    senha_original: string,
    nivel: string,
    limite?: number,
    start?: number
}
