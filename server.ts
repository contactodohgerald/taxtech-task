import express from 'express'
import bodyParser from 'body-parser';
import { connection } from './src/database/connection'

import combineRouter from './src/routes/api';
import defaults from './src/config/default';

const app = express()

if(connection()){

    // app.use(express.json());
    
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(bodyParser.json()); 

    //routes
    combineRouter(app)

    app.listen(defaults.port(), () => console.log(`app listening on port ${defaults.port()}`))
}else{
    console.error('database not connected')
}