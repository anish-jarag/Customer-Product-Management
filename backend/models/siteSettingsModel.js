const { getDB } = require("../config/db");

const getSiteSettingsCollection = () => getDB().collection("siteSettings");

const getSettings = async () => {
  const settings = getSiteSettingsCollection();
  let siteSettings = await settings.findOne({});
  
  // Insert default settings if no settings exist
  if (!siteSettings) {
    siteSettings = {
      theme: "light",
      allowRegistration: true
    };
    await settings.insertOne(siteSettings);
  }

  return siteSettings;
};

const updateSettings = async (updateData) => {
  const settings = getSiteSettingsCollection();
  return await settings.updateOne({}, { $set: updateData }, { upsert: true });
};

module.exports = {
  getSettings,
  updateSettings,
};

