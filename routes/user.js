import express from 'express';
import userHelper from '../helpers/userHelper.js';

const verifyLogin = (req, res, next) => {
    if (req.session.user && req.session.user.loggedIn) {
        next()
    } else {
        res.redirect('/login')
    }
}

const router = express.Router()

router.get('/', verifyLogin, (req, res) => {
    res.render('user/home', { userData: req.session.user })
})

router.get('/signup', (req, res) => {
    if (req.session.user && req.session.user.loggedIn) {
        res.redirect('/')
    }
    res.render('user/signUp')
})

router.post('/signup', (req, res) => {
    userHelper.doSignup(req)
        .then((data) => {
            req.session.user = {}
            req.session.user.id = data._id
            req.session.user.name = data.firstname
            req.session.user.loggedIn = true
            res.redirect('/')
        }).catch((err) => {
            console.log(err)
            res.render('user/signUp', { error: err})
        })
})

router.get('/login', (req, res) => {
    if((req.session.user && req.session.user.loggedIn)) {
        res.redirect('/')
    } else {
        res.render('user/login', { title: "User" })
    }
})

router.post('/login', (req, res) => {
    userHelper.doLogin(req).then((data) => {
        req.session.user = {}
        req.session.user.id = data._id
        req.session.user.name = data.firstname
        req.session.user.loggedIn = true
        res.redirect('/')
    }).catch(err => {
        res.render('user/login', { error: err })
    })
})

router.get('/logout', verifyLogin, (req, res) => {
    req.session.user = null
    res.redirect('/login')
})

export default router;