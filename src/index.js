const fs = require("fs");
const path = require("path");
const { getAccessToken, getAssertions } = require("./lib");
const config = require("./config");
const jsonexport = require("jsonexport");

async function run() {
  // Get access token
  let token;
  try {
    token = await getAccessToken();
  } catch (e) {
    console.error(e);
    throw new Error("Error when fetching access token");
  }

  //   Get assertions
  let assertions;
  try {
    console.log(
      `Fetching assertions for badge class ${
        (config.BADGR_BADGE_CLASS_ID, token)
      }`
    );
    console.log("This may take a minute...");
    assertions = await getAssertions(config.BADGR_BADGE_CLASS_ID, token);
    console.log(`Found ${assertions.length} assertions.`);
  } catch (e) {
    console.log(e);
    throw new Error(
      `Error when fetching assertions for badge class with ID '${config.BADGR_BADGE_CLASS_ID}'`
    );
  }

  // Set up output
  const outdirName = "output";
  if (!fs.existsSync(outdirName)) {
    fs.mkdirSync(outdirName);
  }
  const jsonOutpath = path.resolve(
    outdirName,
    `${new Date().toISOString()}-${config.BADGR_BADGE_CLASS_ID}.json`
  );

  const csvOutpath = path.resolve(
    outdirName,
    `${new Date().toISOString()}-${config.BADGR_BADGE_CLASS_ID}.csv`
  );

  // Write JSON file
  fs.writeFileSync(jsonOutpath, JSON.stringify(assertions), "utf-8");

  // Set up streams
  const reader = fs.createReadStream(jsonOutpath);
  const writer = fs.createWriteStream(csvOutpath);

  // Write CSV file
  reader.pipe(jsonexport()).pipe(writer);
}

run();
