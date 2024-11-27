import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  zip: { type: String, required: true },
});

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'buyer', 'seller'], default: 'buyer', required: true },
  address: addressSchema,
  order_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  companyName: { type: String },
  companyRegistration: { type: String },
}, 
{ timestamps: true });


userSchema.path('companyName').validate(function (value) {
  if (this.role === 'seller' && !value) {
    throw new Error('Company name is required for sellers');
  }
});

userSchema.path('companyRegistration').validate(function (value) {
  if (this.role === 'seller' && !value) {
    throw new Error('Company registration is required for sellers');
  }
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
