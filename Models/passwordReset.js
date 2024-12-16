import mongoose, { Schema } from "mongoose";

const passwordResetSchema = new Schema({
  userId: { type: String, unique: true },
  email: { type: String, unique: true },
  token: String,
  createdAt: Date,
  expiresAt: Date,
});

// Check if the model is already defined
const PasswordReset = mongoose.models.PasswordReset || mongoose.model("PasswordReset", passwordResetSchema);

export default PasswordReset;
