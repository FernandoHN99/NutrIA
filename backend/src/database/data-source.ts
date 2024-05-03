import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { USUARIO, HOST, DATABASE, SENHA, PORTA_DB } from '../config/variaveis'
import Usuario  from '../app/entities/usuario'
import Cartao from '../app/entities/cartao'
import Dia from '../app/entities/dia'

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: HOST,
   port: PORTA_DB,
   username: USUARIO,
   password: SENHA,
   database: DATABASE,
   synchronize: false,
   logging: false,
   entities: [Usuario, Cartao, Dia],
   migrations: [],
   subscribers: [],
})
