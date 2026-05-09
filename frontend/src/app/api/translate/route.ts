import { NextRequest, NextResponse } from "next/server";
import translate from "translate-google";

type TranslationRequest = {
  text?: string;
  source_language?: string;
  target_language?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TranslationRequest;

    const text = body.text?.trim();
    const sourceLanguage = (body.source_language ?? "auto").trim();
    const targetLanguage = (body.target_language ?? "").trim();

    if (!text) {
      return NextResponse.json(
        { detail: "Please enter some text to translate." },
        { status: 400 },
      );
    }

    if (!targetLanguage) {
      return NextResponse.json(
        { detail: "Please select a target language." },
        { status: 400 },
      );
    }

    const translatedText = await translate(text, {
      from: sourceLanguage === "auto" ? "auto" : sourceLanguage,
      to: targetLanguage,
    });

    return NextResponse.json({
      translated_text: translatedText,
      source_language: sourceLanguage,
      target_language: targetLanguage,
    });
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : "Unable to translate right now.";
    return NextResponse.json({ detail }, { status: 400 });
  }
}
