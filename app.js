import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express';
import logger from 'morgan';
import mongoose from "mongoose"
import hbs from 'hbs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import adminRouter from './routes/admin.js'
import usersRouter from './routes/user.js';


const app =  express()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(logger('dev'))
// app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.urlencoded({ extended: false }));


// routers
app.use('/admin', adminRouter);
app.use('/', usersRouter);

// Database connection
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to database'))
// db.once('open', () => {
//     console.log(`Connected to database "${db.name}"`);
//     db.db.listCollections().toArray((err, collections) => {
//       console.log('Collections:');
//       collections.forEach(col => console.log(`- ${col.name}`));
//     });
//   });



// app.get('/', (req, res) => {
//     res.render('index', {title: "Rizwan"})
// })


app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
})