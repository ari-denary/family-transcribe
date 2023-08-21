const { NextResponse } = require('next/server');
const fs = require('fs');
// Import the Google Cloud Translate module
const {Translate} = require('@google-cloud/translate').v2;

const credentialsPath = 'lib/familytranscribe_google.json';
const CREDENTIALS = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId:CREDENTIALS.project_id
});

//For .env file
// const {Translate} = require('@google-cloud/translate').v2;
// // import { NextResponse } from 'next/server';
// require('dotenv').config();

// const two = process.env.OPENAI_API_KEY;
// console.log(two, "two")

// const CREDENTIALS = JSON.parse(two || '{}');

// const translate = new Translate({
//     credentials: CREDENTIALS,
//     projectId:CREDENTIALS.project_id
// });
//End of for .env file

async function POST(request: Request) {
    const translate = new Translate({
        credentials: CREDENTIALS,
        projectId:CREDENTIALS.project_id
    });
  
    const {text, language} = await request.json();
  
    try {
        const [translation] = await translate.translate(text, language);
        console.log(`Translation: ${translation}`);
        return NextResponse.json({
            summary: translation
        });
      } catch (error) {
        console.error('Translation error:', error);
        throw new Error('Translation failed') //res.status => 400 error Bad Request
      }
  }

  module.exports = {
    POST
};

// async function translateText() {
//     const text = 'Hello, world!';
//     const targetLanguage = 'la'; // French
  
//     try {
//       const [translation] = await translate.translate(text, targetLanguage);
//     //   console.log(`Original: ${text}`);
//       console.log(`Translation: ${translation}`);
//       return translation;
//     } catch (error) {
//       console.error('Translation error:', error);
//       throw new Error('Translation failed') //res.status => 400 error Bad Request
//     }
//   }