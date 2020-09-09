const FCM = require("fcm-node");
const con = require("../database-connection");

module.exports = {
  async sendNotification(
    tokens,
    description,
    title,
    order_id,
    item_id,
    screenNo
  ) {
    var fcm = new FCM(process.env.FCMSERVERKEY);

    for (let i = 0; i < tokens.length; i++) {
      var message = {
        to: tokens[i].meta_value,
        collapse_key: "dsaf",
        notification: {
          title: title,
          body: description
        },
        data: {
          screenNo: screenNo.toString(),
          orderId: order_id.toString(),
          itemId: item_id.toString()
        }
      };
      fcm.send(message, (err, response) => {
        if (err) {
          console.log("error");
          console.log(err);
        } else {
          console.log(response);
        }
      });
    }
  },

  async sendOrderStatusNotification(
    status,
    user_id,
    order_id = "",
    item_id = "",
    screenNo = "1"
  ) {
    let message, title;
    message = title = "";
    switch (status) {
      case 0:
        title = "Order Placed";
        message = `Order (${order_id}) placed successfully.`;
        break;
      case 1:
        title = "Order Accepted";
        message = `Your order no  ${order_id} is acccepted by seller.`;
        break;
      case 2:
        title = "Order Processing";
        message = `Your order no ${order_id} is processing by seller.`;
        break;
      case 3:
        title = "Order Shipped";
        message = `Your order no ${order_id} is shipped by seller.`;
        break;
      case 4:
        (title = "Order Delivered"),
          (message = `Your order no ${order_id} is delivered by Curiour`);
        break;
      case 6:
        (title = "Order Return accepted"),
          (message = `Your order no ${order_id} is accepted for return by seller.`);
        break;
      case 7:
        (title = "Order Cancelled"),
          (message = `Your order no ${order_id} is cancelled.`);
        break;
      default:
        break;
    }
    let sql = `select * from meta where user_id=${user_id} and meta_key='noti_token'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.sendNotification(
          result,
          message,
          title,
          order_id,
          item_id,
          screenNo
        );
        sql = `insert into notifications(user_id,title,description,orderId,itemId) values (${user_id} , '${title}', '${message}',${order_id},${item_id})`;
        con.query(sql);
      }
    });
  },

  async sendNotificationWithMessage(user_id, title, message) {
    let sql = `select * from meta where user_id=${user_id} and meta_key='noti_token'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        sql = `insert into notifications(user_id,title,description) values (${user_id} , '${title}', '${message}')`;
        con.query(sql);
        var fcm = new FCM(process.env.FCMSERVERKEY);
        for (let token of result) {
          var messageToSend = {
            to: token.meta_value,
            collapse_key: "dsaf",
            notification: {
              title: title,
              body: message
            },
            data: {
              screenNo: "1"
            }
          };
          fcm.send(messageToSend, (err, response) => {
            if (err) {
              console.log("error");
              console.log(err);
            } else {
              console.log(response);
            }
          });
        }
      }
    });
  }
};
