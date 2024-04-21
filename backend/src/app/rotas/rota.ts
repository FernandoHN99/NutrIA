import express from 'express';
import Controller from '../controllers/controller';

export default interface Rota {
   caminho: string;
   controller: Controller;
	roteador: express.Router;
}
