const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "70cdfb44ad1847",
      pass: "279de4daf7e5e5"
    }
  });
