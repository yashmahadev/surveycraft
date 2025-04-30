const express = require("express");
const router = express.Router();
const {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
  updateCustomSlug,
  getFormBySlug,
  publishForm,
  getFormResponses,
  getFormResponseById,
  submitForm,
} = require("../controllers/formController");
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes
router.get("/public/:slug", getFormBySlug);

// Protected routes
router.get("/", authMiddleware, getForms);
router.post("/", authMiddleware, createForm);
router.get("/:id", authMiddleware, getFormById);
router.put("/:id", authMiddleware, updateForm);
router.delete("/:id", authMiddleware, deleteForm);
router.put("/:id/slug", authMiddleware, updateCustomSlug);
router.put("/:id/publish", authMiddleware, publishForm);
router.get("/:formId/responses", authMiddleware, getFormResponses);
router.get(
  "/:formId/responses/:responseId",
  authMiddleware,
  getFormResponseById,
);
router.get("/:id/form", getFormById);
router.post("/:id/submit", submitForm);
module.exports = router;
