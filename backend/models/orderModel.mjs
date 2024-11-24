import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const shippingAddressSchema = mongoose.Schema({
  street: String,
  city: String,
  province: String,
  zip: String,
});

const orderSchema = mongoose.model({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Delivered', 'Cancelled'], required: true },
  items: [orderItemSchema],
  shipping_address: shippingAddressSchema,
  total_price: { type: Number, required: true },
},
  { timestamps: true }
);

const order = mongoose.model('Order', orderSchema);

export default order;