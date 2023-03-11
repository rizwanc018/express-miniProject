import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Usermodel = mongoose.model('User', userSchema)
export default Usermodel