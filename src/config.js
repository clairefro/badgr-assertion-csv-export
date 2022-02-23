require("dotenv").config();

const required = ["BADGR_BADGE_CLASS_ID", "ISSUER_USERNAME", "ISSUER_PASSWORD"];

module.exports = {
  BADGR_BADGE_CLASS_ID: process.env.BADGR_BADGE_CLASS_ID,
  ISSUER_USERNAME: process.env.ISSUER_USERNAME,
  ISSUER_PASSWORD: process.env.ISSUER_PASSWORD,
};
