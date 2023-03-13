import Usermodel from "../models/user.js";
import bcrypt from "bcrypt";

const userHelper = {
    doSignup: (req) => {
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
    },
    doLogin: (req) => {
        return new Promise(async (resolve, reject) => {
            const { email, password } = req.body
            const userCreds = await Usermodel.findOne({ email: email })
            if (userCreds) {
                const status = await bcrypt.compare(password, userCreds.password)
                if (status) {
                    resolve(userCreds)
                }
                reject("Invalid Credentials")
            } else {
                reject("Invalid Credentials")
            }
        })
    }
}

export default userHelper