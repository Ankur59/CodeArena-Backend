const verificatioMailContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to CodeArena! We are excited to have to onboard",
            action: {
                instructions:
                    "To verify the email click on the verify button below",
                button: {
                    color: "#ef4444",
                    text: "Verify your email",
                    link: verificationUrl
                }

            },
            outro: "Need help or have questions? Just reply to this email, we'd love to answere your queries."
        }
    }

}

const forgotPasswordMailContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We heard you forgot your password here is your reset link",
            action: {
                instructions:
                    "Click on this link to reset your password",
                button: {
                    color: "#ef4444",
                    text: "Reset Password",
                    link: passwordResetUrl
                }

            },
            outro: "Need help or have questions? Just reply to this email, we'd love to answere your queries."
        }
    }
}
export { forgotPasswordMailContent, verificatioMailContent }