const fs = require('fs')
const os = require('os')
//const hostname = os.hostname()
const { google } = require('googleapis')

const GOOGLE_API_FOLDER_ID = '1rIntmyW8pbLUbg6L1NFkJ4feWQv_rH6F'

async function uploadFile() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './googlekey.json',
      scopes: ['https://www.googleapis.com/auth/drive']
    })

    const driveService = google.drive({
      version: 'v3',
      auth
    })

    const fileMetadata = {
      'name': 'snowplace.jpg',
      'parents': [GOOGLE_API_FOLDER_ID]
    }

    const media = {
      mimeType: 'image/jpg',
      body: fs.createReadStream('./snow.jpg')
    }

    const response = await driveService.files
    .create({
      resource: fileMetadata,
      media: media,
      field: 'id'
    })

    return response.data.id

  } catch (error) {
    console.log('Upload file error', error)
  }
}      

uploadFile()
  .then(data => {
    console.log(data)
  })
