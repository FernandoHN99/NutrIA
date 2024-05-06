import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { USUARIO, HOST, DATABASE, SENHA, PORTA_DB } from '../config/variaveis'
import Util from '../utils/util'

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: HOST,
   port: PORTA_DB,
   username: USUARIO,
   password: SENHA,
   database: DATABASE,
   synchronize: false,
   logging: false,
   entities: Util.exportarColecao('../app/entities/'),
   migrations: [],
   subscribers: [],
})
