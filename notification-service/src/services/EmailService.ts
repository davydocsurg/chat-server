import sibApiV3Sdk from "sib-api-v3-typescript";
import config from "../config";

const apiInstance = new sibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = config.SENDINBLUE_APIKEY!;

export class EmailService {
    async sendEmail(to: string, subject: string, content: string) {
        let apiInstance = new sibApiV3Sdk.TransactionalEmailsApi();
        let sendSmtpEmail = new sibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.to = [{ email: to }];
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.htmlContent = content;

        try {
            await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log("Email sent successfully");
        } catch (error) {
            console.error(error);
        }
    }
}
