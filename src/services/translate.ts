import { OpenAI } from 'openai'; // Asegúrate de importar OpenAI correctamente
import { FromLanguage, Language } from '../interface/types';
import { SUPPORTED_LANGUAGES } from '../languages/constanst';

// Obtener la API key desde las variables de entorno
const apiKey = import.meta.env.VITE_API_KEY_OPENAI; // Verifica que esta variable esté configurada correctamente

// Configura OpenAI con la API key
const openai = new OpenAI({
  apiKey: apiKey as string,
  dangerouslyAllowBrowser: true, // Habilitar esta opción a pesar de los riesgos
});

// Función para manejar reintentos
async function retryRequest(fn: () => Promise<any>, retries: number = 3, delay: number = 1000): Promise<any> {
  try {
    return await fn();
  } catch (error: unknown) {
    if (retries > 0 && (error as { response?: { status?: number } })?.response?.status === 429) {
      console.warn(`Rate limit exceeded, retrying... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}
// Función de traducción
export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) {
  if (fromLanguage === toLanguage) return text;

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  // Mensajes con el contexto
  const messages: Array<{ role: 'system' | 'user' | 'assistant', content: string }> = [
    // ... (mensajes de contexto como en el código original)
  ];

  try {
    // Utiliza retryRequest para manejar reintentos
    const response = await retryRequest(() =>
      openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Verifica el nombre del modelo
        messages: [
          ...messages,
          {
            role: 'user',
            content: `${text} {{${fromCode}}} [[${toCode}]]`
          }
        ]
      })
    );

    return response.choices[0]?.message?.content || 'No translation available';
  } catch (error) {
    console.error('Error al llamar a la API de OpenAI:', error);
    return 'Translation failed';
  }
}
