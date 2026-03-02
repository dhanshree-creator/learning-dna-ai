import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const bottomRef = useRef(null);

  const wordCount = messages.reduce(
    (acc, msg) => acc + msg.content.split(" ").length,
    0
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async () => {
    if (!code.trim() || loading) return;

    const userMessage = { role: "user", content: code };
    setMessages((prev) => [...prev, userMessage]);
    setCode("");
    setLoading(true);

    try {
      const response = await fetch("https://ai-bharat-5q4q.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  code: code,
  level: "Beginner",
  context: "Simple"
})
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: data.explanation || "Something went wrong." }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Server error." }
      ]);
    }

    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
  <div className="logo-circle">AI</div>
  <div>
    <h2>CodeStory AI</h2>
    <p className="subtitle">Your Intelligent Code Assistant</p>
  </div>
</div>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="usage">
          <p>Total Messages: {messages.length}</p>
          <p>Total Words: {wordCount}</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="main">
        <div className="chat-area">
          {messages.map((msg, index) => (
  <div
    key={index}
    className={`message-wrapper ${msg.role}`}
  >
    {/* AI Avatar */}
    {msg.role === "ai" && (
      <div className="avatar">🤖</div>
    )}

    <div className={`message ${msg.role === "user" ? "user" : "bot"}`}>
      {msg.role === "user" ? (
        <div className="code-block">
          <SyntaxHighlighter
            language="javascript"
            style={darkMode ? oneDark : oneLight}
          >
            {msg.content}
          </SyntaxHighlighter>
          <button
            className="copy-btn"
            onClick={() => copyToClipboard(msg.content)}
          >
            Copy
          </button>
        </div>
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {msg.content}
        </ReactMarkdown>
      )}
    </div>
  </div>
))}
          {loading && <div className="message bot">Thinking...</div>}
          <div ref={bottomRef}></div>
        </div>

        {/* Input Area */}
        <div className="input-area">
          <textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;