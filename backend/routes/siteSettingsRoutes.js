const express = require('express');
const router = express.Router();
const { getSiteSettings, updateSiteSettings } = require("../controllers/siteSettingsController");
const { protect, adminOnly } = require("../middleware/authMiddleware"); 

// Public can view settings
router.get("/", getSiteSettings);

// Only Admin can update settings
router.put("/", updateSiteSettings);

module.exports = router;
