import AdminModel from '../models/admin.js';
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
    }
}

export default adminHelper