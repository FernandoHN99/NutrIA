import express from 'express';

export default interface Rota {
   caminho: string;
	roteador: express.Router;
}
