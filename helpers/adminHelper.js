import AdminModel from '../models/admin.js';
import Usermodel from '../models/user.js';
import bcrypt from "bcrypt";

const adminHelper = {
    doLogin: (req) => {
        return new Promise(async (resolve, reject) => {
            const username = req.body.username
            const password = req.body.password
            const adminCreds = await AdminModel.findOne({ username: username })
            if(adminCreds) {
                const status = await bcrypt.compare(password, adminCreds.password)
                if(status) {
                    resolve(status)
                }
                reject(status)
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
            const data = await Usermodel.deleteOne({_id: id})
            resolve(data)
            // reject("Error deleting")
        })
    }
}

export default adminHelper