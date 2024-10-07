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
  const containerStyle = {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#333",
    color: "#fff",
    minHeight: "100vh",
  };

  const titleStyle = {
    fontSize: "36px",
    marginBottom: "20px",
    color: "#0c8b33", // Breaking Bad green color
    fontWeight: "bold",
  };

  const quoteStyle = {
    fontSize: "24px",
    fontStyle: "italic",
    marginBottom: "20px",
  };

  const authorStyle = {
    fontSize: "20px",
    marginTop: "10px",
    fontWeight: "lighter",
    color: "#aaa",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "#0c8b33", // Breaking Bad green color
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#065f23",
  };
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Breaking Bad Random Phrases Generator</h1>
      <p style={quoteStyle}>
        {phrase.quote ? `"${phrase.quote}"` : "No phrase yet"}
      </p>
      <p style={authorStyle}>{phrase.author}</p>
      <button
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#065f23")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#0c8b33")}
        onClick={getPhrase}
        style={buttonStyle}
      >
        Change Phrase
      </button>
    </div>




  );
}

export default App;
