import { createTransport } from "nodemailer";

const transport = createTransport({
  service: "gmail",
  port: 465,
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


const sendEmail = async (data) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: data.email,
    subject: data.subject,
    text: data.message,
    html: data.html,
  };
  try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;