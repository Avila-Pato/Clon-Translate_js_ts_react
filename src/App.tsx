import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Stack } from 'react-bootstrap';

import './App.css'
import { useStore } from './hooks/useStore';
import { ArrowIcon } from './components/Icons';
import { AUTO_LANGUAGE } from './languages/constanst';
import { LanguageSelector } from './components/LanguagesSelector';
import { SectionType } from './interface/types.d';
import { TextArea } from './components/textArea';
import { useEffect } from 'react';
import { translate } from './services/translate';

export function App() {
  // nos traemos el useStore
const {
  fromLanguage,
  interchangeLanguages,
  toLanguage,
  fromText,
  result,
  setFromLanguage,
  setToLanguage,
  setFromText,
  setResult,
  loading
  
} = useStore();


// creando la renderizacionde la ia con useEfect

useEffect(()=> {
  if(fromText === '' ) return
 
  translate({ fromLanguage, toLanguage, text: fromText })
  .then(result => {
    if(result == null) return
     setResult(result)
  }).catch(() => {setResult('ERROR!')})
}, [fromText])

  return (
    <Container fluid> 
      <h1>Google translate</h1>

    <Row>
      
      <Col>
       {/* cambiar estado de lenguaje */}
       <Stack gap={2}>

       <LanguageSelector
       type={SectionType.From}
       value={fromLanguage}
       onchange={setFromLanguage} />
       
       <TextArea
  
       type={SectionType.From}
       value={fromText}
       onChange={setFromText}
       
       />
       </Stack>
      
      </Col>

      <Col xs= 'auto'>
        <Button 
        variant='link' 
        disabled={fromLanguage === AUTO_LANGUAGE} 
        onClick={interchangeLanguages}>
          <ArrowIcon />
          </Button>
      </Col>

      <Col>
      {/* cambiar estado de lenguaje */}
      <Stack gap={2}>
      <LanguageSelector 
      type={SectionType.To}
      value={toLanguage}
      onchange={setToLanguage}/>
    
      <TextArea 
       loading={loading}
       type={SectionType.To}
       value={result}
       onChange={setResult}
 
       
       />
      </Stack>
      </Col>
      
    </Row>

    </Container>
  )
}export default App
