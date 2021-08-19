import './styles/global.scss'
import { Header } from './components/Header';
import  Routes  from './routes';
import Modal from 'react-modal'

Modal.setAppElement('#root')


function App() {
  return (
    <>
      <Header />
      <Routes />
    </>

  );
}

export default App;
