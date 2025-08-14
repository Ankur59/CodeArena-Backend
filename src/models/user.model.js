import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },

    avatar: {
        type: String,
        required: true,
    },
    rank: {
        type: String,
    },
    rating: {
        type: String
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    refreshtoken: {
        type: String
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hash(this.password, 10)
        next()
    }
    else {
        return next()
    }
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
export const User = new model('users', userSchema)