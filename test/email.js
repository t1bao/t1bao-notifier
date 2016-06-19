import assert from 'assert';
import events from '../lib/events';

var emailConfig = require('./config/mail');
var smsConfig = require('./config/sms');

var path = require('path');

describe('server-notifier', function () {
  describe('email', function () {
    it('should send user reigster captcha', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          captcha: '102333'
        }
      };
      events.emit('email', 'user/register', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });

    it('should send password create', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          password: '102333'
        }
      };
      events.emit('email', 'password/create', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });

    it('should send password retrieve', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          password: '102333'
        }
      };
      events.emit('email', 'password/retrieve', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });

    it('should send captcha general', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          captcha: '102333',
          time: 30
        }
      };
      events.emit('email', 'captcha/general', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });


    // Order
    it('should send order created', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
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
      events.emit('email', 'order/created', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });
    it('should send order accepted', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          customer: {
            username: '小明'
          },
          store: {
            name: '江南明月'
          }
        }
      };
      events.emit('email', 'order/accepted', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });

    it('should send order cancelled by customer', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          merchant: {
            username: '小明'
          },
          customer: {
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
      events.emit('email', 'order/cancelled-by-customer', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });

    it('should send order cancelled by merchant', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          customer: {
            username: '小明'
          },
          store: {
            name: '江南明月'
          },
          order: {
            no: 'osdf'
          }
        }
      };
      events.emit('email', 'order/cancelled-by-merchant', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });

    it('should send order finished', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          customer: {
            username: '小明'
          },
          store: {
            name: '江南明月'
          }
        }
      };
      events.emit('email', 'order/finished', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });
    it('should send order paid', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
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
      events.emit('email', 'order/paid', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });
    it('should send order received', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          customer: {
            username: '小明'
          },
          store: {
            name: '江南明月'
          }
        }
      };
      events.emit('email', 'order/received', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });

    it('should send order delivered', function (done) {
      var options = {
        config: emailConfig,
        toUser: 'tech@t1bao.com',
        options: {
          customer: {
            username: '小明'
          },
          store: {
            name: '江南明月'
          }
        }
      };
      events.emit('email', 'order/delivered', options, function (error, data) {
        assert(!error);
        if (process.env.NOTIFIER_BYPASS <= 0) {
          assert(data.messageId);
        }
        done();
      });
    });

    it('should send order unreachable', function (done) {
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
        done();
      });
    });
  });
});
