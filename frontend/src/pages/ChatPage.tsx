import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "ai";
  text: string;
}

const quickQuestions = [
  "Who will win today?",
  "Pitch report?",
  "Team stats?",
  "Top scorer?",
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hey! 🏏 I'm your Cucuber AI assistant. Ask me anything about matches, stats, or predictions!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: getAIResponse(text) },
      ]);
      setTyping(false);
    }, 1000);
  };

  const getAIResponse = (q: string): string => {
    const lower = q.toLowerCase();
    if (lower.includes("win"))
      return "India has a 67% win probability based on current form 🔥";
    if (lower.includes("pitch"))
      return "Pitch is batting-friendly with even bounce. Expect high scores 🏏";
    if (lower.includes("stat"))
      return "Kohli leads with 312 runs, Bumrah top with 8 wickets 📊";
    if (lower.includes("scorer"))
      return "Kohli is top scorer currently with 89* 💥";
    return "Analyzing data... 🤖 I’ll give you the best insights!";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4 animate-float-up pb-2">
      
      {/* Header */}
      <div className="rounded-[28px] bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-[0_18px_45px_rgba(59,130,246,0.25)]">
        <div className="rounded-[28px] bg-white/20 dark:bg-slate-900/35 backdrop-blur-xl p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold">Cucuber AI</h2>
              <span className="text-[10px] text-cyan-200">● Online</span>
            </div>
          </div>

          <Sparkles className="text-yellow-200" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 px-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "ai" && (
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center mt-1">
                <Bot size={13} className="text-cyan-400" />
              </div>
            )}

            <div
              className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed shadow-md ${
                m.role === "user"
                  ? "rounded-2xl rounded-br-md bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : "rounded-2xl rounded-bl-md bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl text-slate-900 dark:text-white"
              }`}
            >
              {m.text}
            </div>

            {m.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                <User size={13} className="text-blue-500" />
              </div>
            )}
          </div>
        ))}

        {/* Typing */}
        {typing && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Bot size={13} className="text-cyan-400" />
            </div>

            <div className="rounded-2xl px-4 py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl flex gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse delay-200" />
              <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse delay-400" />
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className="px-3 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white whitespace-nowrap shadow-md hover:scale-[1.05] transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask about cricket..."
          className="flex-1 rounded-2xl px-4 py-3 text-sm bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        />

        <button
          onClick={() => send(input)}
          className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg hover:scale-[1.05] transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;