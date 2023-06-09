import AdminModel from '../models/admin.js';
import Usermodel from '../models/user.js';
import bcrypt from "bcrypt";

const adminHelper = {
    doLogin: (req) => {
        return new Promise(async (resolve, reject) => {
            const { username, password } = req.body
            const adminCreds = await AdminModel.findOne({ username: username })
            if (adminCreds) {
                const status = await bcrypt.compare(password, adminCreds.password)
                if (status) {
                    resolve(status)
                }
                reject("Invalid credentials")
            } else {
                reject(false)
            }
        })
    },
    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            const allUsers = await Usermodel.find({})
            allUsers ? resolve(allUsers) : reject("No Users")
        })
    },
    deleteUser: (id) => {
        return new Promise(async (resolve, reject) => {
            const data = await Usermodel.deleteOne({ _id: id })
            resolve(data)
        })
    },
    getUser: (id) => {
        return new Promise(async (resolve, reject) => {
            const data = await Usermodel.findById(id)
            resolve(data)
        })
    },
    updateUser: (id, data) => {
        const { firstname, lastname, email } = data
        try {
            return new Promise(async (resolve, reject) => {
                if (email) {
                    const user = await Usermodel.findById(id)
                    user.firstname = firstname
                    user.lastname = lastname
                    user.email = email
                    user.save()
                    resolve()
                } else {
                    reject("Must provide email")
                }
            })
        } catch (error) {
            reject(error)
        }

    },
    addUser: (req) => {
        return new Promise(async (resolve, reject) => {
            const { firstname, lastname, email, password } = req.body
            if (email && password && firstname) {
                let emailExist = await Usermodel.exists({ email: email })
                if (emailExist) { reject({err: "Email already exist", data: req.body}); return }
                const passwordHash = await bcrypt.hash(password, 10)
                Usermodel.create({ firstname: firstname, lastname: lastname, email: email, password: passwordHash }).then(data => {
                    resolve(data)
                })
            } else {
                reject("no email/password/firstname")
            }
        })
    }
}

export default adminHelper