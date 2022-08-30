import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        default: []
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const userModel = mongoose.model('users', userSchema)

export default userModel