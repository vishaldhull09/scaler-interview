const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    "host": "smtp.ethereal.email",
    "secure": false,
    "port": 587,
    "service": "gmail",
    "auth": {
        "user": "",
        "pass": ""
    },
    // "tls": {
    //     "rejectUnauthorized": false
    // }
});

function mailOptions(toEmail, subject, body) {
    return {
        "from": "",
        "to": toEmail,
        "subject": subject,
        "html": body,
    }
}

async function sendMail(toEmail, subject, body) {
    console.log('In mail ')
    try {
        await transporter.verify();
        console.log("Connected to gmail");
        console.log(toEmail);
        console.log(body);
        var response = await transporter.sendMail(mailOptions(toEmail, subject, body));
        return response;
    }
    catch (err) {
        console.log(err);
        console.log("Unable to send email");
        return response;
    }
}

module.exports.mail = sendMail;