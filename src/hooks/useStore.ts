import { useReducer } from 'react';
import { Action, FromLanguage, Language, type State } from '../interface/types';

//1.- iniciando estado inicial
// acciones que puede usar el usaurio para iniciar el estado

const initialState: State = {
    fromLanguage: 'es',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
  }

  //2.- crear reducer se usa que dependiendo la accion
// lo despacha a la accion lo cual reducer generaara 
// un nuevo estado y este estado se va a pasar al componente


function reducer(state: State, action: Action) {
    const { type } = action;
  
    switch (type) {
      case 'INTERCHANGE_LANGUAGES':
        return {
          ...state,
          fromLanguage: state.toLanguage,
          toLanguage: state.fromLanguage
        };
  
      case 'SET_FROM_LANGUAGE':
        return {
          ...state,
          fromLanguage: action.payload
        };
  
      case 'SET_TO_LANGUAGE':
        return {
          ...state,
          toLanguage: action.payload
        };
  
      case 'SET_FROM_TEXT':
        return {
          ...state,
          loading: true,
          fromText: action.payload,
          result: ''
        };
  
      case 'SET_RESULT':
        return {
          ...state,
          loading: false,
          result: action.payload
        };
  
      default:
        return state;
    }

}

export function useStore() {
     // 3. usar el useReducer
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
}, dispach] = useReducer(reducer, initialState)

// 4- Manterner el dispach para que sea mantenible si en un futuro cambia
const interchangeLanguages = () => {
    dispach({ type: 'INTERCHANGE_LANGUAGES' })
}
const setFromLanguage = (payload: FromLanguage) => {
    dispach({ type: 'SET_FROM_LANGUAGE', payload })
}
const setToLanguage = (payload: Language) => {
    dispach({ type: 'SET_TO_LANGUAGE', payload })
}
const setFromText = (payload: string) => {
    dispach({ type: 'SET_FROM_TEXT', payload })
}
const setResult = (payload: string) => {
    dispach({ type: 'SET_RESULT', payload })
}

return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
    }


}