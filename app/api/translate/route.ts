import { NextResponse } from 'next/server';
// Import the Google Cloud Translate module
const { Translate } = require('@google-cloud/translate').v2;

// const credentialsPath = 'lib/familytranscribe_google.json';
const encodedCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS || '';
const credential = JSON.parse(
  Buffer.from(encodedCredentials, 'base64').toString()
);

/**
 *
 * @param request
 * @returns JSON of translated data
 */

export async function POST(request: Request) {
  const translate = new Translate({
    credentials: {
      type: credential.type,
      project_id: credential.project_id,
      private_key_id: credential.private_key_id,
      private_key: credential.private_key,
      client_email: credential.client_email,
      client_id: credential.client_id,
      auth_uri: credential.auth_uri,
      token_uri: credential.token_uri,
      auth_provider_x509_cert_url: credential.auth_provider_x509_cert_url,
      client_x509_cert_url: credential.client_x509_cert_url,
      universe_domain: credential.universe_domain,
    },
  });

  const { text, language } = await request.json();

  try {
    const [translation] = await translate.translate(text, language);
    console.log(`Translation: ${translation}`);
    return NextResponse.json({
      summary: translation,
    });
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Translation failed'); //res.status => 400 error Bad Request
  }
}
