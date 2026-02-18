import { Router, Request, Response } from "express";
import User from "../models/User";

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/users", async (req: Request, res: Response) => {
  const { name } = req.body;
  const newUser = await User.create({ name });
  res.json(newUser);
});

router.delete("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  await User.destroy({ where: { id } });
  res.json({ message: "User deleted" });
});

export default router;