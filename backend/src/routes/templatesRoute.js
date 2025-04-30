const express = require("express");
const { getTemplates, getTemplateById, createTemplate, cloneTemplate } = require("../controllers/templateController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getTemplates);
router.get("/:id", authMiddleware, getTemplateById);
router.post("/", authMiddleware, createTemplate);
router.post("/clone/:id", authMiddleware, cloneTemplate);

module.exports = router;
