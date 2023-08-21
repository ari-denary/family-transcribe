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

/**
 * 
 * @param request 
 * @returns JSON of translated data
 */

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


/**
 * Detect Language
 */
//Detect Language
/* 
Input:text 
Output: language
Send in text and receive the language that it is written in
*/
async function detectLanguage(request: Request) {
  const {text} = await request.json();

  try {
    const [detection] = await translate.detect(text);
    console.log(`Detected language: ${detection.language}`);
    return detection.language;
  } catch (error) {
    return error;
  }
}

module.exports = {
  POST,
  detectLanguage
};