const Yup = require('yup')
const { pt } = require('yup-locale-pt')

Yup.setLocale(pt)

module.exports = {
    Yup
}