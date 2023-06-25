import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
// 1. REGISTER || METHOD POST
router.post("/register", registerController);

// 2. LOGIN || POST
router.post("/login", loginController);

// 3. Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

// 4. Test routes
router.get("/test", requireSignIn, isAdmin, testController);



// Protected User Route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
// Protected Admin Route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});



// 5. Update profile
router.put("/profile", requireSignIn, updateProfileController);

// 6. Orders
router.get("/orders", requireSignIn, getOrdersController);

// 7. All orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// 8. Order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);

export default router;
