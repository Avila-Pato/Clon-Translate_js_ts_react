
import {type AUTO_LANGUAGE  ,type SUPPORTED_LANGUAGES } from '../languages/constanst';
// creando un tipo para tener 1 de kas keys que tenemos en el SUPORTED_LANGUAGES
// de esta manera controlamos el objeto
export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage


export interface State {
    fromLanguage: FromLanguage
     toLanguage: Language
     fromText: string
     result: string
     loading: boolean
}

export type Action = 
{ type: 'SET_FROM_LANGUAGE', payload: FromLanguage } |
{ type: 'INTERCHANGE_LANGUAGES'} |
{ type: 'SET_TO_LANGUAGE', payload: Language } |
{ type: 'SET_FROM_TEXT', payload: string } |
{ type: 'SET_RESULT', payload: string } 


// enums son para facilitar usar string a mano de lean de manera mas clara
export enum SectionType {
    From = 'from',
    To = 'to'
}