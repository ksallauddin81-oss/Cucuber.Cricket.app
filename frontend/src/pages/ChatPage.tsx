import { useEffect, useRef, useState } from "react";
import {
  Send,
  Bot,
  Sparkles,
  Cpu,
  Mic,
  Brain,
  Trophy,
  Activity,
  Trash2,
  MicOff,
} from "lucide-react";
import AdCard from "../components/AdCard";

type ChatMessage = {
  role: "ai" | "user";
  text: string;
  time: string;
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const getNow = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Hi! I am Cucuber AI 🤖 Ask me about live match, predictions, pitch reports, players and cricket insights.",
      time: getNow(),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      setMessage(spokenText);

      setTimeout(() => {
        sendMessage(spokenText);
      }, 300);
    };

    recognition.onerror = () => {
      setListening(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "🎤 Mic error. Please allow microphone permission and try again.",
          time: getNow(),
        },
      ]);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (typing) return;

    if (!recognitionRef.current) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "🎤 Voice input is not supported in this browser. Try Chrome or Edge.",
          time: getNow(),
        },
      ]);
      return;
    }

    try {
      recognitionRef.current.start();
    } catch {
      setListening(false);
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
      setListening(false);
    } catch {
      setListening(false);
    }
  };

  const sendMessage = async (quickText?: string) => {
    const finalText = quickText || message;
    if (!finalText.trim() || typing) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: finalText, time: getNow() },
    ]);

    setMessage("");
    setTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: finalText }),
      });

      const data = await res.json();

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: data.response || "Sorry, I couldn't understand that right now.",
            time: getNow(),
          },
        ]);
        setTyping(false);
      }, 700);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "⚠️ Backend connection failed. Please check if FastAPI server is running on port 8000.",
          time: getNow(),
        },
      ]);
      setTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        text: "Chat cleared ✅ Ask me anything about cricket 🏏",
        time: getNow(),
      },
    ]);
  };

  return (
    <div className="min-h-screen pb-28 bg-[#050713] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#22d3ee55,transparent_30%),radial-gradient(circle_at_80%_15%,#a855f755,transparent_30%),radial-gradient(circle_at_50%_90%,#ec489944,transparent_35%)] animate-pulse" />
      <div className="absolute top-20 left-8 w-32 h-32 bg-cyan-400/25 blur-3xl rounded-full animate-bounce" />
      <div className="absolute top-56 right-6 w-28 h-28 bg-purple-500/25 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-36 left-14 w-36 h-36 bg-pink-500/20 blur-3xl rounded-full animate-bounce" />

      <div className="relative z-10 px-5 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-cyan-300 font-semibold tracking-widest">
              CUCUBER SMART ASSISTANT
            </p>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Cucuber AI
            </h1>
            <p className="text-sm text-gray-300">
              Real cricket brain with live backend data
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearChat}
              className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-red-500/30 transition"
            >
              <Trash2 size={18} className="text-red-300" />
            </button>

            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Sparkles className="text-cyan-300" />
            </div>
          </div>
        </div>

        <div className="rounded-[34px] bg-white/10 border border-white/15 backdrop-blur-xl p-6 mb-5 text-center shadow-2xl">
          <div className="relative w-28 h-28 mx-auto">
            <div className="absolute inset-0 rounded-full bg-cyan-400 blur-2xl opacity-50 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-purple-500 blur-xl opacity-40 animate-pulse" />

            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-cyan-300 via-purple-400 to-pink-400 p-1">
              <div className="w-full h-full rounded-full bg-[#101827] flex items-center justify-center">
                <Bot size={54} className="text-cyan-200 animate-pulse" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-5">AI Match Brain</h2>
          <p className="text-gray-300 text-sm mt-2">
            Live scores, prediction, pitch, squads and match insights.
          </p>

          {listening && (
            <p className="mt-3 text-sm text-cyan-300 animate-pulse font-semibold">
              🎤 Listening... speak now
            </p>
          )}

          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="rounded-2xl bg-cyan-400/10 border border-cyan-300/20 p-3">
              <Activity className="mx-auto text-cyan-300 mb-1" size={20} />
              <p className="text-xs font-semibold">Live</p>
            </div>

            <div className="rounded-2xl bg-purple-400/10 border border-purple-300/20 p-3">
              <Brain className="mx-auto text-purple-300 mb-1" size={20} />
              <p className="text-xs font-semibold">AI</p>
            </div>

            <div className="rounded-2xl bg-pink-400/10 border border-pink-300/20 p-3">
              <Trophy className="mx-auto text-pink-300 mb-1" size={20} />
              <p className="text-xs font-semibold">Prediction</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="rounded-2xl bg-cyan-400/10 border border-cyan-300/20 p-4">
            <Cpu className="text-cyan-300 mb-2" />
            <p className="font-semibold text-sm">Analysis</p>
          </div>

          <button
            onClick={listening ? stopListening : startListening}
            className={`rounded-2xl border p-4 text-left transition ${
              listening
                ? "bg-red-500/20 border-red-300/40"
                : "bg-purple-400/10 border-purple-300/20"
            }`}
          >
            {listening ? (
              <MicOff className="text-red-300 mb-2 animate-pulse" />
            ) : (
              <Mic className="text-purple-300 mb-2" />
            )}
            <p className="font-semibold text-sm">
              {listening ? "Stop Mic" : "Voice"}
            </p>
          </button>

          <div className="rounded-2xl bg-pink-400/10 border border-pink-300/20 p-4">
            <Brain className="text-pink-300 mb-2" />
            <p className="font-semibold text-sm">Insights</p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 mb-5 no-scrollbar">
          {[
            "live match",
            "who may win today?",
            "pitch report",
            "best player today",
            "upcoming match",
            "recent result",
            "spin or pace advantage",
          ].map((item) => (
            <button
              key={item}
              onClick={() => sendMessage(item)}
              className="shrink-0 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm text-gray-200 hover:bg-white/20 transition"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-5">
          <AdCard />
        </div>

        <div className="space-y-4 mb-28">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[82%] px-4 py-3 text-sm shadow-xl whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl rounded-tr-md"
                    : "bg-white/10 border border-white/15 rounded-3xl rounded-tl-md"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-[10px] opacity-60 mt-2">{msg.time}</p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Bot size={18} className="animate-pulse" />
              <span>Cucuber AI is thinking...</span>
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce delay-150" />
                <span className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce delay-300" />
              </span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 px-4 z-20">
        <div className="max-w-xl mx-auto flex items-center gap-3 rounded-3xl bg-[#101827]/90 border border-white/15 backdrop-blur-xl p-3 shadow-2xl">
          <button
            onClick={listening ? stopListening : startListening}
            disabled={typing}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition disabled:opacity-50 ${
              listening
                ? "bg-red-500 animate-pulse"
                : "bg-white/10 border border-white/15"
            }`}
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={listening ? "Listening..." : "Ask Cucuber AI..."}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 px-3"
          />

          <button
            onClick={() => sendMessage()}
            disabled={typing}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}