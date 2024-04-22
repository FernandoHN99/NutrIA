import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { USUARIO, HOST, DATABASE, SENHA, PORTA_DB } from '../config/config'
import Usuario  from '../app/entities/usuario'
// import { create1298290 } './migrations/<migrations>'

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: HOST,
   port: PORTA_DB,
   username: USUARIO,
   password: SENHA,
   database: DATABASE,
   synchronize: false,
   logging: false,
   entities: [Usuario],
   migrations: [], //migrations: [create1298290]
   subscribers: [],
})
