import assert from 'assert';
import events from '../lib/events';
var emailConfig = require('./config/mail');
var smsConfig = require('./config/sms');

describe('errors', function () {
  describe('email', function () {
    it('should send unrecognizable message', function () {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          merchant: {
            username: '小明'
          }
        }
      };
      var catched = false;
      try {
        events.emit('email', 'user/registersoso', options, function () {});
      } catch (e) {
        console.log(e);
        catched = true;
      }
      assert(catched);
    });

    it('should not send order unreachable', function (done) {
      var options = {
        config: {},
        toUser: 'tech@t1bao.com',
        options: {
          merchant: {
            username: '小明'
          }
        }
      };
      events.emit('email', 'order/unreachable', options, function (error, data) {
        assert(error);
        done();
      });
    });

    it('should send order unreachable', function (done) {
      process.env.NOTIFIER_BYPASS = 0;
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          merchant: {
            username: '小明'
          }
        }
      };
      events.emit('email', 'order/unreachable', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        process.env.NOTIFIER_BYPASS = 1;
        done();
      });
    });
  });

  describe('sms', function () {
    it('should send unrecognizable message', function () {
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          merchant: {
            username: '小明'
          }
        }
      };
      var catched = false;
      try {
        events.emit('sms', 'user/registersosodf', options, function () {});
      } catch (e) {
        catched = true;
      }
      assert(catched);
    });

    it('should not send order unreachable', function (done) {
      var options = {
        config: {},
        toUser: process.env.NN_SMS_PHONE,
        options: {
          merchant: {
            username: '小明'
          },
          order: {
            no: 'no'
          }
        }
      };
      events.emit('sms', 'order/unreachable', options, function (error, data) {
        assert(error);
        done();
      });
    });

    // it('should send order unreachable', function (done) {
    //   process.env.NOTIFIER_BYPASS = 0;
    //   var options = {
    //     config: smsConfig,
    //     toUser: process.env.NN_SMS_PHONE,
    //     options: {
    //       merchant: {
    //         username: '小明'
    //       },
    //       order: {
    //         no: 'no'
    //       }
    //     }
    //   };
    //   events.emit('sms', 'order/unreachable', options, function (error, data) {
    //     assert(!error);
    //     if (process.env.NOTIFIER_BYPASS <= 0) {
    //       assert(data.statusCode === '000000');
    //       assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
    //       assert(data.dateCreated || data.templateSMS.dateCreated);
    //     }
    //     process.env.NOTIFIER_BYPASS = 1;
    //     done();
    //   });
    // });
  });
});
