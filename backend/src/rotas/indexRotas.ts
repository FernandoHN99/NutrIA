import express, { Router } from 'express';
import UsuarioRotas from './usuarioRotas';

export function configurarRotas(roteador: Router): void {
   const usuarioRotas = new UsuarioRotas();
   roteador.use('/usuarios', usuarioRotas.roteador);
}
