import { useState } from "react";
import * as v from 'valibot';

const PhraseSchema = v.object({
  quote: v.string(),
  author: v.string()
})
type Phrase = v.InferOutput<typeof PhraseSchema>
function App(): JSX.Element {

  const [phrase, setPhrase] = useState<Phrase>({ quote: "", author: "" });
  const getPhrase = async () => {
    const request = await fetch("https://api.breakingbadquotes.xyz/v1/quotes");
    const response = await request.json();
    const phrase = v.parse(PhraseSchema, response[0])
    const { quote, author } = phrase;
    setPhrase({ quote, author });
  };

  return (
    <>
      <h1>Breaking Bad Random Phrases Generator</h1>
      <p>{phrase.quote ? `"${phrase.quote}" - ${phrase.author}` : "No phrase yet"}</p>
      <button onClick={() => getPhrase()}>Change Phrase</button>
    </>
  );
}

export default App;
