export async function getSummary(content: string) {
  const response = await fetch('/api/openai/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({text: content})
  });

  console.log(response);
  const data = await response.json();
  return data.summary;
}