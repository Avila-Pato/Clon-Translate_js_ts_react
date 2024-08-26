// src/api.ts
interface TranslateRequest {
    fromLanguage: string;
    toLanguage: string;
    text: string;
  }
  
  export async function translate({
    fromLanguage,
    toLanguage,
    text
  }: TranslateRequest): Promise<string | null> {
    if (fromLanguage === toLanguage) return text;
  
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fromLanguage,
          toLanguage,
          text
        })
      });
  
      const result = await response.json();
      return result.translation;
    } catch (error) {
      console.error('Error al llamar a la función serverless:', error);
      return null;
    }
  }
  