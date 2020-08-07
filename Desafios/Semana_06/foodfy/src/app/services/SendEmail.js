const mailer = require('../../lib/mailer')

const sendEmail = async ({ user, subject, html }) => {
    await mailer.sendMail({
        to: user,
        from: 'no-reply@foodfy.com.br',
        subject: subject,
        html: html
    })
}

module.exports = sendEmail
