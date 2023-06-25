import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
    categoryController,
    createCategoryController,
    deleteCategoryCOntroller,
    singleCategoryController,
    updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// 1. Create Category
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);

// 2. Update category
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
);

// 3. getALL category
router.get("/get-category", categoryController);

// 4. Single category
router.get("/single-category/:slug", singleCategoryController);

// 5. Delete category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryCOntroller
);

export default router;