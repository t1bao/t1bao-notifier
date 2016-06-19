var notifier = require('node-notification');
// var timeRecord = {};

function sendSms(config, data, cb) {
  var sender = notifier.senders.sms;
  var parsedConfig = sender.config.parse(config);
  if (!parsedConfig) {
    cb(true);
    return;
  }
  data = sender.data.parse(data);
  if (!data) {
    cb(true);
    return;
  }
  if (process.env.NOTIFIER_BYPASS > 0) {
    console.info('NOTIFIER_BYPASS = ' + process.env.NOTIFIER_BYPASS);
    console.info('NOTIFIER_BYPASS is set');
    console.info('Please disable it by remove NOTIFIER_BYPASS from the env');
    cb(false);
    return;
  }
  sender.send(parsedConfig, data, cb);
}

function sendTemplatedSms(config, phone, params, id, cb) {
  var data = {
    phone: phone,
    params: params,
    templateId: String(id)
  };
  sendSms(config, data, cb);
}

export default {
  send: sendTemplatedSms
};
