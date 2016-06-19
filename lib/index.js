var path = require('path');
var email = require('./email');
var sms = require('./sms');

function send(config, data, cb) {
  var sender = null;
  switch (data.type) {
    case 'sms':
      sender = sms;
      sender.send(config, data.toUser, data.params, data.id, cb);
      break;
    case 'email':
      sender = email;
      var html = email.compile(path.resolve(data.path, data.template), data.options);
      sender.send(config, data.toUser, data.title, html, cb);
      break;
    default:
      throw new Error("类型没有指定");
  }
}

export default send;
