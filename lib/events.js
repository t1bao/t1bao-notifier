// var EventEmitter = require("events").EventEmitter;
// var emitter = new EventEmitter();
//
// //
// // var eventOption = {
// //   // event name
// //   name: '',
// //   // sender
// //   sender:
// //   // from
// //   fromUser:
// //   // to
// //   toUser:
// //   data:
// // };
//
// function getSender(type) {
//   var sender = null;
//   switch (type) {
//   case 'sms':
//     sender = NotificationService.sms;
//     break;
//   case 'email':
//   default:
//     sender = NotificationService.mail;
//     break;
//   }
//   return sender;
// }
//
// emitter.on("password-create", function (type, password, receiver, cb) {
//   var sender = getSender(type);
//   if (sender) {
//     sender.password.create(receiver, password, cb || function () {});
//   }
// });
//
// emitter.on("password-retrieve", function (type, password, receiver, cb) {
//   var sender = getSender(type);
//   if (sender) {
//     sender.password.retrieve(receiver, password, cb || function () {});
//   }
// });
//
// emitter.on("captcha-general", function (type, captcha, receiver, cb) {
//   var sender = getSender(type);
//   if (sender) {
//     sender.captcha.general(receiver, captcha, cb || function () {});
//   }
// });
//
// emitter.on("user-register", function (type, captcha, receiver, cb) {
//   var sender = getSender(type);
//
//   if (sender) {
//     sender.user.register(receiver, captcha, cb || function () {});
//   }
// });
//
// emitter.on("order-create", function (type, orderId, receiver, cb) {
//   var sender = getSender(type);
//
//   if (sender) {
//     sender.order.create(receiver, orderId, cb || function () {});
//   }
// });
//
// emitter.on("order-cancel", function (type, orderId, receiver, cb) {
//   var sender = getSender(type);
//
//   if (sender) {
//     sender.order.cancel(receiver, orderId, cb || function () {});
//   }
// });
//
// emitter.on("order-accept", function (type, orderId, receiver, cb) {
//   var sender = getSender(type);
//
//   if (sender) {
//     sender.order.create(receiver, orderId, cb || function () {});
//   }
// });
//
// module.exports = emitter;
//
//
// export default {
//   emitter: emitter
// };
