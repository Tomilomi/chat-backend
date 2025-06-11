import express from "express"
import UserService from "../services/user.service"

const router = express.Router();
const userService = new UserService()

router.post("/login", async (req, res) => {
  try {
    const { user_name, user_password } = req.body

    if (!user_name || !user_password) {
      return res.status(400).json({ error: "Missing username or password" });
    }


    const outcome = await userService.login(user_name, user_password);

    if (!outcome) {
      return res.status(401).json({ error: "invalid user or password" })
    }

    res.json(outcome)
  }
  catch (error) {
    console.error("Error al obtener imagen:", error)
    res.status(500).json({ error: "Internal server error" })
  }

})


