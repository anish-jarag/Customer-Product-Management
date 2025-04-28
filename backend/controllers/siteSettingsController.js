const { getSettings, updateSettings } = require("../models/siteSettingsModel");

// Get Current Site Settings
exports.getSiteSettings = async (req, res) => {
  try {
    const settings = await getSettings();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching site settings", error });
  }
};

// Update Site Settings
exports.updateSiteSettings = async (req, res) => {
  try {
    const updateData = req.body;
    await updateSettings(updateData);
    res.status(200).json({ message: "Site settings updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating site settings", error });
  }
};
