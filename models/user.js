import mongoose from "mongoose"
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

export const User = mongoose.model("User", UserSchema);


// export const authenticateUser = async (req, res, next) => {
//   const user = await User.findOne({
//     accessToken: req.header("Authorization")
//   })

//   if (user) {
//     req.user = user
//     next()
//   } else {
//     res.status(401).json({
//       loggedOut: true
//     })
//   }
// }