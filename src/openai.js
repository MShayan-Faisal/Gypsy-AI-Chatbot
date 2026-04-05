// import Groq from "groq-sdk";
// import { send } from "vite";
// const { OpenAI, Configuration } = require('Groq');
// const configuration = new OpenAI.Configuration({
//   apiKey:process.env.REACT_APP_GROQ_API_KEY
// });
// const openai = new OpenAI(configuration);

// const groq = new Groq();
// async function main() {
//   const completion = await groq.chat.completions.create({
//     model: "openai/gpt-oss-120b",
//     messages: [
//       {
//         role: "user",
//         content: "Explain why fast inference is critical for reasoning models",
//       },
//     ],
//   });
//   console.log(completion.choices[0]?.message?.content);
// }
// main().catch(console.error);

// export async function sendMessage(message) {
//     const res = await openai.completions.create({
//         model: "openai/gpt-oss-120b",
//         prompt: message,
//         max_tokens: 100,
//         temperature: 0.7,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//     });
//     return res.data.choices[0].text.trim();
// }





// _____________________________________________________________________________________________________


export async function sendMessage(message) {
  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    return data.reply;

  } catch (error) {
    console.error(error);
    return "⚠️ Error: Unable to get response";
  }
}