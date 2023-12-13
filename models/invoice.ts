const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
    },
    customerAddress: {
      type: String,
    },
    customerEmail: {
      type: String,
    },
    customerPhone: {
      type: String,
    },
    payAmount: {
      type: Number,
    },
    date: {
      type: String,
    },
    invoiceNumber: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    items: [
      {
        itemName: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        unit: {
          type: String,
        },
        price: {
          type: Number,
        },
        discount: {
          type: Number,
        },
        tax: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
