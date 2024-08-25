
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from './hooks/useStore';

export function App() {
  // nos traemos el useStore
const {fromLanguage, setFromLanguage} = useStore();
 
  return (
    <div className='App'>
      <h1>Google translate</h1>
      <button onClick={() => {
        setFromLanguage('es')
        }}>Intercambiar idiomas</button>
        {fromLanguage}
    </div>
  )
}

export default App
