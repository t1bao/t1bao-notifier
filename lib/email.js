var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var notifier = require('node-notification');
var sender = notifier.senders.mailer;

function compile(templatePath, options) {
  var html = String(fs.readFileSync(path.resolve(templatePath)));
  return ejs.render(html, options);
}

function email(config, to, subject, html, cb) {
  var smtp = sender.smtp.parse(config);
  var mailOptions = {
    from: smtp.email,
    to: to,
    subject: subject,
    body: html
  };
  var data = sender.content.parse(mailOptions);
  if (!data) {
    cb(true);
    return;
  }
  data = sender.content.create(data.from, data.to, data.subject, data.body, 'html');
  // if (!data) {
  //   cb(true);
  //   return;
  // }
  if (process.env.NOTIFIER_BYPASS > 0) {
    console.info('NOTIFIER_BYPASS = ' + process.env.NOTIFIER_BYPASS);
    console.info('NOTIFIER_BYPASS is set');
    console.info('Please disable it by remove NOTIFIER_BYPASS from the env');
    cb(false);
    return;
  }
  sender.send(smtp, data, cb);
}

module.exports = {
  compile: compile,
  send: function (config, to, subject, html, cb) {
    email(config, to, subject, html, cb);
  }
};
