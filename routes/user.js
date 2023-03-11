import express from 'express';
import userHelper from '../helpers/userHelper.js';

const router = express.Router()

router.get('/', (req, res) => {
    res.send("Home page")
})

router.get('/signup', (req, res) => {
    res.render('user/signUp', {title: "User"})
    // userHelper.doSignup(req)
})

router.post('/signup', (req, res) => {
    userHelper.doSignup(req).then((status) => {
        res.redirect('/')
    }).catch((err) => {
        res.render('user/signUp', {error: err})
    })
})

router.get('/login', (req, res) => {
    res.render('user/login', {title: "User"})
})

router.post('/login', (req, res) => {
    res.render('user/login', {title: "User"})
})




export default router;