// interfaces/Rota.ts
import express from 'express';

export default interface Rota<T> {
   controller: T;
	roteador: express.Router;
	criarRotas(): void;
}
