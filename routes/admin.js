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
    res.render('admin/dashboard')
})

router.post('/login', async (req, res) => {
    adminHelper.doLogin(req).then((isAdmin) => {
        res.redirect("dashboard")
    }).catch((err) => {
        console.log(err);
        res.redirect("/")

    })
})

export default router;