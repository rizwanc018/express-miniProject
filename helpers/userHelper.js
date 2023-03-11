import Usermodel from "../models/user.js";
import bcrypt from "bcrypt";

const userHelper = {
    doSignup: (req) => {
        return new Promise(async (resolve, reject) => {
            const { firstname, lastname, email, password } = req.body
            //    console.log(firstname, lastname, email, password);


            try {
                if (email && password && firstname) {
                    let emailExist = await Usermodel.exists({ email: email })
                    if (emailExist) {reject("Email already exist"); return}
                    const passwordHash = await bcrypt.hash(password, 10)
                    Usermodel.create({ firstname: firstname, lastname: lastname, email: email, password: passwordHash }).then(data => {
                        resolve("User created")
                    })
                } else {
                    reject("no email/password/firstname")
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
}

export default userHelper

// const adminHelper = {
//     doLogin: (req) => {
//         return new Promise(async (resolve, reject) => {
//             const username = req.body.username
//             const password = req.body.password
//             const adminCreds = await AdminModel.findOne({ username: username })
//             if(adminCreds) {
//                 const status = await bcrypt.compare(password, adminCreds.password)
//                 if(status) {
//                     resolve(status)
//                 }
//                 reject(status)
//             } else {
//                 reject(false)
//             }
//         })
//     }
// }