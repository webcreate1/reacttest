import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const [femaleVoice, setFemaleVoice] = useState(null);
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDBhoWYv7D7wqrAItrSgSb-CDl_6GJt7qQ",
  });

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const female = voices.find((v) =>
          v.name.toLowerCase().includes("heera")
        );
        setFemaleVoice(female || voices[0]);
      }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);
  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  let startListing = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onStart = () => setListening(true);
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      addMessage("user", transcript);
      await sendToGemini(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };
  async function main(text) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
    });
    return response.text;
  }

  const sendToGemini = async (text) => {
    addMessage("ai", "Thinking...");
    const prompt = `
You are a friendly, patient English tutor and my speaking partner you choose new topic for conversation. 
Your task is to help the user improve their English naturally. 
For every sentence the user gives, do the following:
1. Correct any grammar mistakes.
2. Explain the mistakes simply.
3. Suggest a natural alternative sentence.
4. Respond in a friendly, conversational way, as if you are talking to the user in person.
5. expain 3-4 line and human language 
6. never use this  **
 ${text}`;
    const data = await main(prompt);
    const aiText = data || "No response";
    setMessages((prev) => [
      ...prev.filter((m) => m.text !== "Thinking..."),
      { sender: "ai", text: aiText },
    ]);
    speakVoice(aiText);
  };

  // 🔊 Speak text aloud
  const speakVoice = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    if (femaleVoice) {
      utter.voice = femaleVoice;
    }

    utter.lang = "en-IN";
    window.speechSynthesis.speak(utter);
  };

  return (
    <>
      <div className="mx-auto  max-w-2xl">
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.sender === "user" ? "You" : "AI Teacher"}:</strong>{" "}
            {msg.text}
          </p>
        ))}
      </div>

      <div className="mx-auto max-w-2xl flex flex-row-reverse">
        <button onClick={() => startListing()} className="cursor-pointer">
          {listening ? "Listening..." : "🎤 Speak"}
        </button>
      </div>
    </>
  );
}

export default Chat;
