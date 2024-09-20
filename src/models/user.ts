import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  accountType: {
    type: String,
    enum: ['Organization', 'Individual'],
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password') && this.password) {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    console.error('Error in pre-save middleware:', error);
    next(error as mongoose.CallbackError);
  }
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const userModel = mongoose.model('user', userSchema);
export default userModel;
