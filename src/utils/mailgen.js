import Mailgen from "mailgen"
import nodemailer from "nodemailer  "

const sendEmail = async (options) => {

    const mailGenarator = new Mailgen({
        theme: "default",
        product: {
            name: "CodeArena",
            link: "https://taskmanagelink.com"
        }
    })
    
    const emailText = mailGenarator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenarator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport = ({
        host: process.env.MAIL_TRAP_HOST,
        port: process.env.MAIL_TRAP_USER,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASS
        }
    })
    const mail = {
        from: "mail.CodeArena@example.com",
        to: options.mail,
        subject: options.subject,
        text: emailText,
        html: emailHtml,
    }
    try {
        transporter.sendMail(mail)
    } catch (error) {
        console.error("Error in sending mail", error)
    }
}

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


export { forgotPasswordMailContent, verificatioMailContent, sendEmail }