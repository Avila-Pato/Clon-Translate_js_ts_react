import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button } from 'react-bootstrap';

import './App.css'
import { useStore } from './hooks/useStore';
import { ArrowIcon } from './components/Icons';
import { AUTO_LANGUAGE } from './languages/constanst';
import { LanguageSelector } from './components/LanguagesSelector';

export function App() {
  // nos traemos el useStore
const {
  fromLanguage,
  interchangeLanguages,
  toLanguage,
  setFromLanguage,
  setToLanguage
  
} = useStore();

  return (
    <Container fluid> 
      <h1>Google translate</h1>

    <Row>
      
      <Col>
       {/* cambiar estado de lenguaje */}
       <LanguageSelector
       type='from'
       value={fromLanguage}
       onchange={setFromLanguage} />
       {fromLanguage}
      
      </Col>

      <Col>
        <Button 
        variant='link' 
        disabled={fromLanguage === AUTO_LANGUAGE} 
        onClick={interchangeLanguages}>
          <ArrowIcon />
          </Button>
      </Col>

      <Col>
      {/* cambiar estado de lenguaje */}
      <LanguageSelector 
      type='to'
      value={toLanguage}
      onchange={setToLanguage}/>
      {toLanguage}

      </Col>
      
    </Row>

    </Container>
  )
}export default App
