import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const shippingAddressSchema = mongoose.Schema({
  
});

const orderSchema = mongoose.model({

}, { timestamps: true });

const order = mongoose.model('Order', orderSchema);

export default order;