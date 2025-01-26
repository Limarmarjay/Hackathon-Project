var toPay = require("./Parvathi-work/exp_calc");
var express = require("express");
var app = express();
const { Recipient, EmailParams, MailerSend } = require("mailersend");

require('dotenv').config();

const mailersend = new MailerSend({
    apiKey: process.env.MAILER_SEND_API_KEY,
});

app.use(express.json());

function sendEmail(recipientEmail, toPay) {
    const recipients = [new Recipient(recipientEmail, "Susan Uche")];
    const emailParams = new EmailParams()
        .setFrom("support@splittop.com")
        .setFromName("SplitTop")
        .setRecipients(recipients);

    if (toPay > 0) {
        emailParams.setSubject("You are being owed by your roommate(s)");
    } else if (toPay < 0) {
        emailParams.setSubject("Send your Payment that you owe your roommate(s)");
    } else {
        emailParams.setSubject("You have no debt");
    }
    emailParams.setHtml("<h1> You received this email from MailerSend </h1>")
        .setText("You received this email from MailerSend");

    mailersend.send(emailParams)
        .then(response => {
            console.log("Email sent successfully", response);
        })
        .catch(error => {
            console.error("Error sending email", error);
        });
}

app.post("/Settle_now", (req, res) => {
    const { recipientEmail, toPay } = req.body;
    
    if (!recipientEmail || typeof toPay === "undefined") 
        {
            return res.status(400).json({ error: "Missing required fields (recipientEmail, toPay)" });
        }

    sendEmail(recipientEmail, toPay);
    res.status(200).json({ message: "Email sent successfully!" });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => 
    {
        console.log("Server is running on port ${PORT}");
    });
