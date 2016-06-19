import assert from 'assert';
import events from '../lib/events';

var smsConfig = require('./config/sms');

describe('server-notifier', function () {
  describe('sms', function () {
    it('should send user reigster captcha', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          captcha: '388222',
        }
      };
      events.emit('sms', 'user/register', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send password create', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          password: '388222',
        }
      };
      events.emit('sms', 'password/create', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send password retrieve', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          password: '381222',
        }
      };
      events.emit('sms', 'password/retrieve', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send captcha general', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          captcha: '381222',
        }
      };
      events.emit('sms', 'captcha/general', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });


    // Order
    it('should send order created', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          merchant: {
            username: '小明'
          },
          order: {
            no: 'no',
            address: 'address',
            receiver: 'receiver',
            phone: 'phone'
          }
        }
      };
      events.emit('sms', 'order/created', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send order accepted', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          customer: {
            username: '小明'
          },
          store: {
            name: '江南明月'
          },
          order: {
            no: 'no'
          }
        }
      };
      events.emit('sms', 'order/accepted', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send order cancelled by customer', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          merchant: {
            username: 'merchant'
          },
          customer: {
            username: 'customer'
          },
          order: {
            no: 'no',
            address: 'address',
            receiver: 'receiver',
            phone: 'phone'
          }
        }
      };
      events.emit('sms', 'order/cancelled-by-customer', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {

          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send order cancelled by merchant', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          customer: {
            username: '小明'
          },
          store: {
            name: '江南明月'
          }
        }
      };
      events.emit('sms', 'order/cancelled-by-merchant', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send order finished', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          customer: {
            username: '小明'
          },
          store: {
            name: '江南明月'
          },
          merchant: {
            username: 'merchant'
          },
          order: {
            no: 'odfdf'
          }
        }
      };
      events.emit('sms', 'order/finished', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0 && false) {
          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send order paid', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          merchant: {
            username: '小明'
          },
          order: {
            no: 'no',
            address: 'address',
            receiver: 'receiver',
            phone: 'phone'
          }
        }
      };
      events.emit('sms', 'order/paid', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send order received', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          customer: {
            username: '小明'
          },
          store: {
            name: '江南明月'
          },
          order: {
            no: 'osdfsfd'
          }
        }
      };
      events.emit('sms', 'order/received', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {

          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send order delivered', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
        toUser: process.env.NN_SMS_PHONE,
        options: {
          customer: {
            username: '小明'
          },
          store: {
            name: '江南明月'
          },
          order: {
            no: 'osdfsfd'
          }
        }
      };
      events.emit('sms', 'order/delivered', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {

          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();
      });
    });

    it('should send order unreachable', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      var options = {
        config: smsConfig,
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
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {

          assert(data.statusCode === '000000');
          assert(data.smsMessageSid || data.templateSMS.smsMessageSid);
          assert(data.dateCreated || data.templateSMS.dateCreated);
        }
        done();

      });
    });
  });
});
