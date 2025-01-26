// Code to send automated emails
var express = require("express");
var app = express();
app.use(express());
const Recipient = require("mailersend").recipient;
const EmailParams = require("mailersend").emailparams;
const MailerSend = require("mailersend");
// boolean isOwedMoney = debts.get(userId) > 0;

const mailersend = new MailerSend(
    {
        apiKey: process.env.MAILER_SEND_API_KEY,
    })

function sendEmail(recipientEmail) 
{
    const recipients = [new Recipient(recipientEmail, "Susan Uche")];
    const emailParams = new EmailParams()
    .setFrom("www.splittop.com")
    .setFromName("Splittop")
    .setRecipients(recipients)
    if (isOwedMoney) 
        {
            emailParams.setSubject("You are being owed by your roommate")
        }
    else 
    {
        emailParams.setSubject("Send your Payment that you owe your roommate")
    }
    emailParams.setHtml("You received this email from MailerSend")
    .setText("You received this email from MailerSend");
    mailersend.send(emailParams);
}
// The button click
app.post("/settle now", (req, res) => 
    {
        const {recipientEmail} = req.body;
        sendEmail(recipientEmail);
    });