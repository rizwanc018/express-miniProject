import express from 'express';
import adminHelper from '../helpers/adminHelper.js';
import userHelper from '../helpers/userHelper.js';

const router = express.Router()

const verifyAdmin = (req, res, next) => {
    if (req.session.admin) {
        next()
    } else {
        res.redirect('/')
    }
}

router.get('/', (req, res) => {
    res.redirect('/admin/dashboard')
})

router.get('/login', (req, res) => {
    res.render('admin/login')
})

router.post('/login', async (req, res) => {
    adminHelper.doLogin(req).then((isAdmin) => {
        req.session.admin = isAdmin
        res.redirect("dashboard")
    }).catch((err) => {
        res.redirect("/")
    })
})

router.use(verifyAdmin)

router.get('/dashboard', (req, res) => {
    adminHelper.getAllUsers().then((allusers) => {
        res.render('admin/dashboard', { allusers: allusers, isAdmin: req.session.admin })
    })
})


router.get('/adduser', (req, res) => {
    res.render('admin/addUser', {isAdmin: req.session.admin})
})

router.post('/adduser', (req, res) => {
    userHelper.doSignup(req)
        .then(() => {
            res.redirect('dashboard')
        }).catch((err) => {
            res.render('admin/addUser', { error: err })
        })
})

router.get('/edit/:id', (req, res) => {
    adminHelper.getUser(req.params.id).then((data) => {
        res.render('admin/editUser', { data: data, isAdmin: req.session.admin  })
    })
})

router.put('/update/:id', (req, res) => {
    adminHelper.updateUser(req.params.id, req.body).then(() => {
        res.redirect('/admin/dashboard')
    }).catch(err => {
        res.redirect(`/admin/edit/${req.params.id}`)
    })
})

router.get('/delete/:id', (req, res) => {
    adminHelper.deleteUser(req.params.id)
        .then(() => {
            res.redirect("/admin/dashboard")
        }).catch(err => {
            res.redirect("/admin/dashboard")
        })
})

router.get('/logout', (req, res) => {
    req.session.admin = null
    res.render('admin/login')
})

export default router;