export async function getSummary(content: string) {
  const response = await fetch('/api/openai/summary/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: content }),
  });

  console.log(response);
  const data = await response.json();
  return data.summary;
}

export async function getHTML(content: string) {
  const response = await fetch('/api/openai/addhtml/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: content }),
  });

  console.log(response);
  const data = await response.json();
  return data.summary;
}
