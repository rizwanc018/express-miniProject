import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express';
import methodOverride from 'method-override'
import logger from 'morgan';
import mongoose from "mongoose"
import hbs from 'hbs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import adminRouter from './routes/admin.js'
import usersRouter from './routes/user.js';
import session from 'express-session';
import nocache from 'nocache';


const app =  express()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.use(session({ secret: 'secure', cookie: { maxAge: 600000 }}))
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000000 }
  }));
app.use(methodOverride('_method'))
app.use(logger('dev'))
// app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.urlencoded({ extended: false }));
app.use(nocache());

// routers
app.use('/admin', adminRouter);
app.use('/', usersRouter);

// Database connection
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to database'))

app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
})