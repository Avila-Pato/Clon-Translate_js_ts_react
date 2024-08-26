// types/gemini-api.d.ts
declare module 'gemini-api' {
  export default class GeminiAPI {
    chat: any;
    constructor(config: { apiKey: string; dangerouslyAllowBrowser: boolean });
    translate(params: { fromLanguage: string; toLanguage: string; text: string }): Promise<{ translatedText: string }>;
  }
}
