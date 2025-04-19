const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    console.log("🚀 Sending email to:", to);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail email
        pass: process.env.EMAIL_PASS, // Your Gmail password
      },
    });

    const info = await transporter.sendMail({
      from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent: ", info.response);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

module.exports = sendEmail;
