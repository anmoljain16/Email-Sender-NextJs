const nodemailer = require('nodemailer');

// POST endpoint for sending emails

export async function POST(req) {
    const { recipient, subject, content } = await req.json();
    // console.log(recipient);
    // console.log(content);

    // Create a transporter for sending the email
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        host:'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        },
    });

    // Define the email options
    const mailOptions = {
        from:{
            name : 'Anmol Jain',
            address : process.env.USER
        },
        to: recipient,
        subject: subject +" From Anmol Jain NextJS APP",
        html: content,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        return Response.json({ message: 'Email sent successfully' ,error: false});
    } catch (error) {
        console.error('Error occurred:', error);
        return Response.json({ message: 'Failed to send email', error: true});
    }
}




