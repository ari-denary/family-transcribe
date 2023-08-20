export async function getTranslation(content: string, language:string) {
  const response = await fetch('/api/translate/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({text: content, language:language})
  });

  console.log(response);
  const data = await response.json();
  return data.summary;
}