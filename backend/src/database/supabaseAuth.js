
// import { createClient } from '@supabase/supabase-js'
// import express from 'express';
// import bodyParser from 'body-parser';
// import { config } from 'dotenv';

// // Carrega as variáveis de ambiente do arquivo .env
// config();

// // Agora você pode usar as variáveis de ambiente em seu código


// const app = express();
// app.use(bodyParser.json());

// export default class SupabaseAuth {

//    constructor() {
//       const API_EXTERNAL_URL = process.env.API_EXTERNAL_URL;
//       const ANON_KEY = process.env.ANON_KEY;
//       //Configure o cliente Supabase
//       this.supabase = createClient(API_EXTERNAL_URL, ANON_KEY);

//    }   

//    async signInWithEmailAndPassword() {
//       const { data, error } = await this.supabase.auth.signInWithPassword({
//          email: 'teste@gmail.com',
//          password: 'hp2FRfuFYKzhayYqRNz@7J9BiVT4*',
//       });
//       return { data, error };
//    }
// }

