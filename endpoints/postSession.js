import { User } from "../models/user";
import bcrypt from "bcrypt"

export const postSession = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  })

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({
      userId: user._id,
      accessToken: user.accessToken
    })
  } else {
    res.json({ notFound: true })
  }
}