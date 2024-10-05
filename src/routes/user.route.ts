import { upload } from "./../middlewares/multer.middleware";
import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  logout,
  updateUser,
} from "../controllers/user.controller";
import { validateData } from "../middlewares/validationData";
import { loginUserSchema } from "../schema/userSchema";
import verifyJWT from "../middlewares/verify-jwt";

const router = Router();

router.route("/").get(getAllUsers);
router.route("/detail").get(verifyJWT, getUser);
router.route("/register").post(upload.single("image"), createUser);
router
  .route("/login")
  .post(upload.none(), validateData(loginUserSchema), loginUser);
router.route("/logout").get(verifyJWT, logout);
router
  .route("/:id")
  .patch(upload.single("image"), updateUser)
  .delete(deleteUser);

export default router;
