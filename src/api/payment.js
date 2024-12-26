import { Router } from "express";
import { authenticate } from "passport";

const router = Router();

router.get(
  "/payment",
  authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You have a total of: 2400$");
  }
);

export default router;
