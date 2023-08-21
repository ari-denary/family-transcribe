const fs1 = require('fs');
// Import the Google Cloud Translate module
const {Translate: GoogleTranslate} = require('@google-cloud/translate').v2;

const credentialsPath1 = 'lib/familytranscribe_google.json';
const CREDENTIALS1 = JSON.parse(fs1.readFileSync(credentialsPath1, 'utf8'));

const translate1 = new GoogleTranslate({
    credentials: CREDENTIALS1,
    projectId:CREDENTIALS1.project_id
});


//For .env file
// const {Translate} = require('@google-cloud/translate').v2;
// import { NextResponse } from 'next/server';
// require('dotenv').config();

// const test = process.env.CREDENTIALS;
// console.log(test, "test")

// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS || '{}');
//Can add the variable const translate
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
      const [detection] = await translate1.detect(text);
      console.log(`Detected language: ${detection.language}`);
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
    const targetLanguage = 'la'; // Latin
  
    try {
      const [translation] = await translate1.translate(text, targetLanguage);
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