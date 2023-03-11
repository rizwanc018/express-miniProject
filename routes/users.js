import express from 'express';

const router = express.Router()

router.get('/', (req, res) => {
    res.send("Home page")
})

router.get('/signup', (req, res) => {
    res.render('user/signUp', {title: "User"})
})

router.get('/login', (req, res) => {
    res.render('user/login', {title: "User"})
})



export default router;