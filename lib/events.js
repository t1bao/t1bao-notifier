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
    toUser: data.toUser
  };
  var params = data.options;
  var idx = event.split('/');
  options.id = smsTemplates[idx[0]][idx[1]];
  switch (event) {
    case 'order/paid':
      options.params = [params.order.no, params.order.receiver, params.order.phone, params.order.address];
      break;
    case 'order/created':
      options.params = [params.order.no + ';', params.order.receiver + ';', params.order.phone];
      break;
    case 'order/accepted':
      options.params = ['[' + params.store.name + ']', '[' + params.order.no + ']'];
      break;
    case 'order/finished':
      options.params = [params.merchant.username, '[' + params.order.no + ']'];
      break;
    case 'order/received':
      options.params = ['[' + params.order.no + ']', '[' + params.customer.username + ']'];
      break;
    case 'order/delivered':
      options.params = ['[' + params.store.name + ']'];
      break;
    case 'order/unreachable':
      options.params = ['[' + params.order.no + ']'];
      break;
    case 'order/cancelled-by-customer':
      options.params = ['[' + params.customer.username + ']', '[' + params.order.no + ']'];
      break;
    case 'order/cancelled-by-merchant':
      options.params = ['商户[' + params.store.name + ']'];
      break;
    case 'user/register':
      options.params = ['田一块小卖部', params.captcha, 30];
      break;
    case 'captcha/general':
      options.params = [params.captcha];
      break;
    case 'password/retrieve':
    case 'password/create':
      options.params = [params.password, 30];
      break;
    default:
      throw new Error("No Event Found");
  }
  serverNotifier(data.config, options, cb);
});

emitter.on('email', function (event, data, cb) {
  var options = {
    type: 'email',
    toUser: data.toUser,
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
      throw new Error("No Event Found");
  }

  // 必须放在下面
  options.title = emailTemplates[idx[0]][idx[1]].title;
  options.template = emailTemplates[idx[0]][idx[1]].file;
  serverNotifier(data.config, options, cb);
});

export default emitter;
