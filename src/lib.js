const axios = require("axios");
const qs = require("qs");
const config = require("./config");

async function getAccessToken() {
  const data = qs.stringify({
    password: config.ISSUER_PASSWORD,
    username: config.ISSUER_USERNAME,
  });

  const opts = {
    method: "post",
    url: "https://api.badgr.io/o/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  return axios(opts).then((r) => r.data.access_token);
}

const API_BASE_URL = `https://api.badgr.io/v2`;

async function getAssertions(badgeClassId, token) {
  const url = `${API_BASE_URL}/badgeclasses/${badgeClassId}/assertions`;
  const opts = {
    method: "get",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios(opts).then((r) => r.data.result);
}

module.exports = { getAccessToken, getAssertions };
