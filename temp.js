const GOOGLE_API_FOLDER_ID = '1rIntmyW8pbLUbg6L1NFkJ4feWQv_rH6F'

const { google } = require("googleapis");
const fs = require("fs");
const os = require('os')
const hostname = os.hostname()

const KEYFILEPATH = "./googlekey.json";
const SCOPES = ["https://www.googleapis.com/auth/drive"];
path = process.env.USERPROFILE+'\\Documents\\Share\\'

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const uploadFiles = async (auth) => {
  const driveService = google.drive({ version: "v3", auth });
  let count = 0;

  for (const file of fs.readdirSync(
    path
  )) {
    // Log the file name.
    console.log(JSON.stringify(file));

    let fileMetadata = {
      name: file,
      parents: [GOOGLE_API_FOLDER_ID] + hostname,
    };

    let media = {
      mimeType: "image/jpeg",
      body: fs.createReadStream(
        path + file
      ),
    };

    const task = driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    try {
      await task;
      count = count + 1;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  // log the total count of uploaded files.
  console.log("Count :", count);
  return;
};

uploadFiles(auth).catch(console.error);

//EXEMPLE to create new Dir
let fileMetadata = {
  name: hostname,
  mimeType: 'application/vnd.google-apps.folder'
}