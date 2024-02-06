import nodemailer from "nodemailer";
import config from "../config/config";

export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            secure: false,
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass,
            },
        });
    }

    async sendEmail(to: string, subject: string, content: string) {
        const mailOptions = {
            from: config.EMAIL_FROM,
            to: to,
            subject: subject,
            html: content,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log("Email sent: %s", info.messageId);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }
}
