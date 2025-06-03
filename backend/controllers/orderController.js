const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const nodemailer = require("nodemailer");

const generateOrderNumber = () => `ORD-${Date.now()}`;

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3dc22dd9664f67",
    pass: "****84ff"
  }
});

exports.createOrder = async (req, res) => {
  const { customer, product, variant, quantity } = req.body;

  const orderNumber = generateOrderNumber();
  const total = product.price * quantity;

  const status = Math.random() < 0.8 ? "Approved" : "Declined"; 

  const order = new Order({
    orderNumber,
    customer,
    product,
    variant,
    quantity,
    total,
    status
  });

  await order.save();

  if (status === "Approved") {
    await Product.findByIdAndUpdate(product._id, { $inc: { inventory: -quantity } });
    await transporter.sendMail({
      from: '"eShop" <no-reply@eshop.com>',
      to: customer.email,
      subject: "Order Confirmation",
      text: `Your order ${orderNumber} was placed successfully.`
    });
  } else {
    await transporter.sendMail({
      from: '"eShop" <no-reply@eshop.com>',
      to: customer.email,
      subject: "Order Failed",
      text: `Your order ${orderNumber} could not be processed.`
    });
  }

  res.json({ orderNumber });
};

exports.getOrderByNumber = async (req, res) => {
  const order = await Order.findOne({ orderNumber: req.params.orderNumber });
  res.json(order);
};
