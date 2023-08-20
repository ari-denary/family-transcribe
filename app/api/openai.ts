import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true});


/**
 * Returns a gpt-summarized version of passed-in text.
 *  - can also add more user/assistant messages to "prime" the model
 *    before passing in user text
 *
 * @param text - the text to be summarized
 */
export async function summarize(text: string){
  const completion = await openai.chat.completions.create({
    messages: [
      {role: "system", //system messages tell the model 'what it is'
        content:
        "You are an assistant that provides clear and simplified summaries of articles."
    },
      {role: "user", //the prompt
       content: text},
      // {role: "assistant", content: ""} //example responses to fine-tune model
    ],
    model: "gpt-3.5-turbo",
  })
  console.log(completion.choices[0])
  return completion.choices[0].message.content
}

