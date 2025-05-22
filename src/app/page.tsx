"use client";

import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="質問を入力してください"
      />
      <button onClick={handleSend}>送信</button>
      <div>AIの返答: {response}</div>
    </div>
  );
}