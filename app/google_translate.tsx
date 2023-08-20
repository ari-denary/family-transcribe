const fs = require('fs');

const credentialsPath = 'app/familytranscribe_google.json';
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));


// Import the Google Cloud Translate module
const {Translate} = require('@google-cloud/translate').v2;

const translate = new Translate({ credentials });

// Translate text
async function translateText() {
    const text = 'Hello, world!';
    const targetLanguage = 'fr'; // French
  
    try {
      const [translation] = await translate.translate(text, targetLanguage);
      console.log(`Original: ${text}`);
      console.log(`Translation: ${translation}`);
    } catch (error) {
      console.error('Translation error:', error);
    }
  }

  translateText();