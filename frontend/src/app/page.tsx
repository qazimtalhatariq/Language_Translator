"use client";

import { useMemo, useState } from "react";

type LanguageOption = {
  code: string;
  label: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "auto", label: "Auto Detect" },
  { code: "en", label: "English" },
  { code: "ur", label: "Urdu" },
  { code: "af", label: "Afrikaans" },
  { code: "sq", label: "Albanian" },
  { code: "am", label: "Amharic" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "pt", label: "Portuguese" },
  { code: "ar", label: "Arabic" },
  { code: "bn", label: "Bengali" },
  { code: "bg", label: "Bulgarian" },
  { code: "ca", label: "Catalan" },
  { code: "hr", label: "Croatian" },
  { code: "cs", label: "Czech" },
  { code: "da", label: "Danish" },
  { code: "nl", label: "Dutch" },
  { code: "et", label: "Estonian" },
  { code: "fi", label: "Finnish" },
  { code: "el", label: "Greek" },
  { code: "gu", label: "Gujarati" },
  { code: "he", label: "Hebrew" },
  { code: "hu", label: "Hungarian" },
  { code: "id", label: "Indonesian" },
  { code: "kn", label: "Kannada" },
  { code: "lv", label: "Latvian" },
  { code: "lt", label: "Lithuanian" },
  { code: "ms", label: "Malay" },
  { code: "ml", label: "Malayalam" },
  { code: "mr", label: "Marathi" },
  { code: "ne", label: "Nepali" },
  { code: "no", label: "Norwegian" },
  { code: "fa", label: "Persian" },
  { code: "pl", label: "Polish" },
  { code: "pa", label: "Punjabi" },
  { code: "ro", label: "Romanian" },
  { code: "sr", label: "Serbian" },
  { code: "sk", label: "Slovak" },
  { code: "sl", label: "Slovenian" },
  { code: "sw", label: "Swahili" },
  { code: "sv", label: "Swedish" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "th", label: "Thai" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "hi", label: "Hindi" },
  { code: "tr", label: "Turkish" },
  { code: "ru", label: "Russian" },
  { code: "uk", label: "Ukrainian" },
  { code: "vi", label: "Vietnamese" },
  { code: "cy", label: "Welsh" },
];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("ur");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const disableSwap = useMemo(() => sourceLanguage === "auto", [sourceLanguage]);

  const handleSwapLanguages = () => {
    if (disableSwap) return;

    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleTranslate = async () => {
    setError("");

    if (!inputText.trim()) {
      setError("Please enter some text to translate.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          source_language: sourceLanguage,
          target_language: targetLanguage,
        }),
      });

      const data = (await response.json()) as { translated_text?: string; detail?: string };
      if (!response.ok) {
        throw new Error(data.detail ?? "Unexpected server error.");
      }

      setTranslatedText(data.translated_text ?? "");
    } catch (translateError) {
      const message =
        translateError instanceof Error
          ? translateError.message
          : "Unable to translate right now.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-slate-100">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl" />

      <section className="relative mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:p-10">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs tracking-wide text-cyan-200">
              MULTILINGUAL TRANSLATOR
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">Global Language Translator</h1>
          </div>
          <div className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-slate-300">
            <p>Source Language: {sourceLanguage.toUpperCase()}</p>
            <p>Target Language: {targetLanguage.toUpperCase()}</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              From
            </label>
            <select
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-slate-100 outline-none ring-cyan-400 transition focus:ring-2"
              value={sourceLanguage}
              onChange={(event) => setSourceLanguage(event.target.value)}
            >
              {LANGUAGE_OPTIONS.map((language) => (
                <option key={language.code} value={language.code} className="text-slate-900">
                  {language.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSwapLanguages}
            disabled={disableSwap}
            className="h-11 rounded-xl border border-white/25 bg-white/10 px-4 text-sm font-semibold text-slate-100 transition hover:scale-105 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Swap ↔
          </button>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              To
            </label>
            <select
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-slate-100 outline-none ring-cyan-400 transition focus:ring-2"
              value={targetLanguage}
              onChange={(event) => setTargetLanguage(event.target.value)}
            >
              {LANGUAGE_OPTIONS.filter((language) => language.code !== "auto").map(
                (language) => (
                  <option key={language.code} value={language.code} className="text-slate-900">
                    {language.label}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/15 bg-black/20 p-3">
            <div className="mb-2 text-xs uppercase tracking-wide text-slate-300">
              Source Text
            </div>
            <textarea
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              placeholder="Type or paste text here..."
              className="min-h-56 w-full resize-y rounded-xl border border-white/15 bg-white/5 p-4 text-slate-100 outline-none ring-cyan-400 placeholder:text-slate-400 focus:ring-2"
            />
          </div>
          <div className="rounded-2xl border border-white/15 bg-black/20 p-3">
            <div className="mb-2 text-xs uppercase tracking-wide text-slate-300">
              Translated Output
            </div>
            <textarea
              value={translatedText}
              readOnly
              placeholder="Translated text will appear here..."
              className="min-h-56 w-full resize-y rounded-xl border border-white/15 bg-white/5 p-4 text-slate-100 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-xl border border-red-400/40 bg-red-500/20 px-4 py-2 text-sm text-red-100">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleTranslate}
            disabled={isLoading}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-900/30 transition hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Translating..." : "Translate"}
          </button>
          <p className="text-sm text-slate-300">
            Tip: Use <span className="font-semibold text-cyan-200">Auto Detect</span> when source language is unknown.
          </p>
        </div>
      </section>
    </main>
  );
}
