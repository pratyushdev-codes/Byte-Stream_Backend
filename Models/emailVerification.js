import mongoose, { Schema } from "mongoose";

const emailVerificationSchema = new Schema({
  userId: String,
  token: String,
  createdAt: Date,
  expiresAt: Date,
});

// Check if the model already exists in mongoose.models, otherwise define it
const Verification = mongoose.models.Verification || mongoose.model("Verification", emailVerificationSchema);

export default Verification;
