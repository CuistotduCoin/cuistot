import mjml2html from 'mjml';

const path = require('path');
const nodemailer = require('nodemailer');
const mjmlUtils = require('mjml-utils');
const AWS = require('aws-sdk');

export const run = (event, context, callback) => {
  const handleResponse = (err, info) => {
    if (err) {
      callback(err);
    } else {
      console.log('Message sent : ', info);
      callback(null, { message: 'Email has been successfully sent' });
    }
  };

  const sendEmail = (html) => {
    const transporter = nodemailer.createTransport({ SES: new AWS.SES({ apiVersion: '2010-12-01' }) });
    const payload = Object.assign({}, event);
    payload.html = html;
    transporter.sendMail(payload, handleResponse);
  };

  mjmlUtils.inject(`${path.join(__dirname, 'email-templates')}/${event.template}.mjml`, event.context)
    .then((content) => {
      const result = mjml2html(content, { minify: true });
      sendEmail(result.html);
    });
};
