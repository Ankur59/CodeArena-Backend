import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { boolean, string } from "zod";
import crypto from "crypto"

const userSchema = new Schema({
    userName: {
        type: String,
        // unique: true,  uncomment this after creating a uniques username in the register controller
        lowecase: true,
        trim: true,
        index: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
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
    password: {
        type: String,
        required: true
    },
    // On first time register ^^

    avatar: {
        type: String,
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

    // Security 
    refreshToken: {
        type: String
    },
    isEmailVerified: {
        type: boolean,
        default: false
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpiry: {
        type: Date
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    },
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        console.log("here", this.password)
        next()
    }
    else {
        return next()
    }
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Sent to client
userSchema.methods.generateAccessToken = function () {

    return jwt.sign({ _id: this._id, email: this.email, username: this.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

// Stored in server
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex")
    const tokenExpiry = Date.now() + (20 * 60 * 1000)
    console.log("hashed token", unHashedToken)

    return { unHashedToken, hashedToken, tokenExpiry }
}

export const User = new model('users', userSchema)