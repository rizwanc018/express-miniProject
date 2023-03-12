import express from 'express';
import AdminModel from '../models/admin.js';
import bcrypt from "bcrypt";
import adminHelper from '../helpers/adminHelper.js';

const router = express.Router()

router.get('/', (req, res) => {
    res.send("admin Home")
})

router.get('/login', (req, res) => {
    res.render('admin/login')
})

router.get('/dashboard', (req, res) => {
    adminHelper.getAllUsers().then((allusers) => {
        res.render('admin/dashboard', {allusers: allusers})
    })
})

router.post('/login', async (req, res) => {
    adminHelper.doLogin(req).then((isAdmin) => {
        res.redirect("dashboard")
    }).catch((err) => {
        console.log(err);
        res.redirect("/")
    })
})

router.get('/edit/:id', (req, res) => {
    res.send(`edit ${req.params.id}`)
})

router.get('/delete/:id', (req, res) => {
    adminHelper.deleteUser(req.params.id)
    .then(() => {
        res.redirect("/admin/dashboard")
    }).catch(err => {
        res.redirect("/admin/dashboard")
    })
})

export default router;