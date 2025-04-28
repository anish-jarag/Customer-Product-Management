const { getSettingsCollection } = require("../models/settingsModel");

exports.getSiteSettings = async (req, res) => {
  const settings = await getSettingsCollection().findOne({
    _id: "siteSettings",
  });
  res.json({ theme: settings.theme });
};

exports.updateSiteSettings = async (req, res) => {
  const { theme } = req.body;
  await getSettingsCollection().updateOne(
    { _id: "siteSettings" },
    { $set: { theme } }
  );
  res.json({ message: "Theme updated successfully", theme });
};
