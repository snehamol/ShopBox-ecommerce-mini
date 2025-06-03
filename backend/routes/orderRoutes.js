const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const sendEmail = require("../utils/mailer");

function generateOrderNumber() {
  return "ORD-" + Math.floor(10000000 + Math.random() * 90000000);
}

router.post("/", async (req, res) => {
  const { customer, product, total } = req.body;
  const orderNumber = generateOrderNumber();
  const random = Math.random();
  let status, message;

  try {

    if (!customer || !customer.email || !customer.name) {
      return res.status(400).json({ message: "Missing customer info" });
    }
    if (!product || !product.title) {
      return res.status(400).json({ message: "Missing product info" });
    }
    if (!total) {
      return res.status(400).json({ message: "Missing total amount" });
    }

    if (random < 0.7) {
      status = "approved";
      message = " Transaction Approved";
    } else if (random < 0.9) {
      status = "declined";
      message = " Transaction Declined";
    } else {
   
      await sendEmail({
        to: customer.email,
        subject: " Transaction Failed - Gateway Error",
        html: `<p>Hi ${customer.name},</p><p>We're sorry, but your transaction could not be processed due to a gateway issue. Please try again later.</p>`,
      });
      return res.status(502).json({ message: " Gateway Error. Please try again." });
    }

    const order = new Order({ orderNumber, customer, product, total, status });
    await order.save();

    try {
      if (status === "approved") {
        await sendEmail({
          to: customer.email,
          subject: ` Order Confirmed - ${orderNumber}`,
          html: `
            <p>Hi ${customer.name},</p>
            <p>Your order <strong>${orderNumber}</strong> has been confirmed!</p>
            <p><strong>Product:</strong> ${product.title}<br/>
               <strong>Quantity:</strong> ${product.quantity}<br/>
               <strong>Total:</strong> $${total}</p>
            <p>Thank you for shopping with us!</p>
          `,
        });
      } else {
        await sendEmail({
          to: customer.email,
          subject: ` Transaction Declined - ${orderNumber}`,
          html: `
            <p>Hi ${customer.name},</p>
            <p>Unfortunately, your transaction for order <strong>${orderNumber}</strong> was declined.</p>
            <p>Please check your card details or try another payment method. Contact support if you need help.</p>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Email sending error:", emailErr);
    }

    res.json({ orderNumber, status, message });
  } catch (err) {
    console.error("Order processing error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/:orderNumber", async (req, res) => {
  const { orderNumber } = req.params;

  try {
    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
