import serverNotifier from './';

// var emailConfig = require('./config/mail');
// var smsConfig = require('./config/sms');
var path = require('path');

var smsTemplates = require('./data/sms');
var emailTemplates = require('./data/email');

var EventEmitter = require("events").EventEmitter;
var emitter = new EventEmitter();

emitter.on('sms', function (event, data, cb) {
  var options = {
    type: 'sms',
    toUser: data.phone
  };
  var idx = event.split('/');
  switch (event) {
    case 'order/create':
    case 'order/cancel':
    case 'order/accept':
      options.params = [data.orderId];
      options.id = smsTemplates[idx[0]][idx[1]];
      break;
    case 'user/register':
      options.params = ['田一块小卖部', data.captcha, 30];
      options.id = smsTemplates[idx[0]][idx[1]][idx[2]];

      break;
    case 'captcha/general':
      options.params = [data.captcha];
      options.id = smsTemplates[idx[0]][idx[1]];
      break;
    case 'password/retrieve':
    case 'password/create':
      options.params = [data.password, 30];
      options.id = smsTemplates[idx[0]][idx[1]];
      break;
    default:
      break;
  }
  serverNotifier(data.config, options, cb);
});

emitter.on('email', function (event, data, cb) {
  var options = {
    type: 'email',
    toUser: data.to,
    options: data.options
  };
  var idx = event.split('/');
  switch (event) {
    case 'order/finished':
    case 'order/paid':
    case 'order/received':
    case 'order/delivered':
    case 'order/unreachable':
    case 'order/created':
    case 'order/cancelled-by-customer':
    case 'order/cancelled-by-merchant':
    case 'order/accepted':
      options.path = path.resolve(__dirname, './data/templates/order');
      break;
    case 'user/register':
      options.path = path.resolve(__dirname, './data/templates/user');
      break;
    case 'captcha/general':
      options.path = path.resolve(__dirname, './data/templates/captcha');
      break;
    case 'password/retrieve':
    case 'password/create':
      options.path = path.resolve(__dirname, './data/templates/password');
      break;
    default:
      break;
  }
  options.title = emailTemplates[idx[0]][idx[1]].title;
  options.template = emailTemplates[idx[0]][idx[1]].file;
  serverNotifier(data.config, options, cb);
});

export default emitter;
