import React, { useState } from "react";

export default function Summarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSummarize = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (!text.trim()) {
        console.log("Please enter some text first.");
        return;
      }

      if (!text) {
        alert("Please enter some text");
        return;
      }

      const response = await fetch("http://localhost:9000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      setText("");
      setSummary(data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs tracking-[0.25em] uppercase">
              Text Intelligence
            </span>
          </div>
          <h1 className="text-4xl font-bold text-stone-100 tracking-tight leading-none">
            Summar<span className="text-amber-400">_</span>ize
          </h1>
          <p className="text-stone-500 text-sm mt-2 tracking-wide">
            Condense any text into its essential meaning
          </p>
        </div>

        {/* Main card */}
        <div className="border border-stone-800 bg-stone-900 rounded-2xl overflow-hidden shadow-2xl">
          {/* Terminal-style top bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-800 bg-stone-950">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="text-stone-600 text-xs ml-2 tracking-widest">
              input.txt
            </span>
          </div>

          <form onSubmit={handleSummarize} className="p-6 space-y-4">
            {/* Textarea */}
            <div className="relative group">
              <textarea
                id="summary-text"
                className="w-full bg-stone-950 text-stone-200 placeholder-stone-600 border border-stone-700 rounded-xl p-4 min-h-48 resize-none focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 transition-all text-sm leading-relaxed"
                placeholder="Paste your text here — articles, reports, emails, anything lengthy..."
                value={text}
                onChange={handleChange}
              />

              {/* Decorative corner */}
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-stone-600 group-focus-within:border-amber-400/40 transition-colors" />
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-between text-xs text-stone-600">
              <div className="flex gap-4">
                <span>
                  <span className="text-stone-400 tabular-nums">
                    {charCount}
                  </span>{" "}
                  chars
                </span>
                <span>
                  <span className="text-stone-400 tabular-nums">
                    {wordCount}
                  </span>{" "}
                  words
                </span>
              </div>
              {charCount > 0 && (
                <button
                  type="button"
                  onClick={() => setText("")}
                  className="text-stone-600 hover:text-red-400 transition-colors text-xs tracking-wide"
                >
                  clear ×
                </button>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!text.trim()}
              className="w-full relative group bg-amber-400 disabled:bg-stone-800 hover:bg-amber-300 text-stone-950 disabled:text-stone-600 font-bold py-3.5 px-6 rounded-xl transition-all text-sm tracking-widest uppercase shadow-lg shadow-amber-400/10 disabled:shadow-none active:scale-[0.98] disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {loading ? "Summarizing..." : "Summarize"}
              </span>
              {/* Hover shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </form>
        </div>

        {/* Output area */}
        {summary && (
          <div className="mt-4 border border-stone-800 bg-stone-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* Output header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-emerald-400 text-xs tracking-[0.2em] uppercase font-bold">
                  Summary
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSummary("")}
                className="text-stone-600 hover:text-stone-400 transition-colors text-xs tracking-wide"
              >
                dismiss ×
              </button>
            </div>

            <div className="p-6">
              <p className="text-stone-300 text-sm leading-relaxed">
                {summary}
              </p>
            </div>

            {/* Copy row */}
            <div className="px-6 pb-5">
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(summary)}
                className="text-xs text-stone-600 hover:text-amber-400 transition-colors tracking-wide border border-stone-800 hover:border-amber-400/30 rounded-lg px-3 py-1.5"
              >
                copy to clipboard
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-stone-700 text-xs mt-6 tracking-widest">
          POWERED BY AI · BUILT FOR CLARITY
        </p>
      </div>
    </div>
  );
}
