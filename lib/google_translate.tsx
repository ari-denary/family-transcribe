// const fs = require('fs');
// // Import the Google Cloud Translate module
// const {Translate} = require('@google-cloud/translate').v2;

// const credentialsPath = 'app/familytranscribe_google.json';
// const CREDENTIALS = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

// const translate = new Translate({ credentials: CREDENTIALS });


//For .env file
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

const apiKey = process.env.CREDENTIALS;

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS || '{}');

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId:CREDENTIALS.project_id
});
//End of for .env file

//Detect Language
/* 
Input:text 
Output: language
Send in text and receive the language that it is written in
*/
async function detectLanguage() {
    const text = "Hello world"

    try {
      const [detection] = await translate.detect(text);
    //   console.log(`Detected language: ${detection.language}`);
      return detection.language;
    } catch (error) {
    //   console.error('Language detection error:', error);
      return error;
    }
  }
  
  detectLanguage();

// Translate text
/* 
Once we get text and targetLanguage, will insert insert those instead
Takes text and takes targetLanguage and returns translated.
To use the variable returned, await translatedText(...)
*/
async function translateText() {
    const text = 'Hello, world!';
    const targetLanguage = 'la'; // French
  
    try {
      const [translation] = await translate.translate(text, targetLanguage);
    //   console.log(`Original: ${text}`);
      console.log(`Translation: ${translation}`);
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Translation failed') //res.status => 400 error Bad Request
    }
  }

translateText();

module.exports = { translateText };