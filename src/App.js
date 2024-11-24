import { Container, Row,Col} from 'react-bootstrap';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {Routes,Route} from 'react-router-dom';
import { UserAuthContextprovider} from './context/UserAuthContent';
import Home from "./components/Home"
import ProtectedRoute from "./components/ProtectedRoute"
function App() {
  return (
    <Container>
      <Row>
        <Col>
        <UserAuthContextprovider>
            <Routes>
            <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute> 
          }
          />
              <Route path="/" element={<Login/>}/>
              <Route path="/SignUp" element={<SignUp/>}/>
              
            </Routes> 
          </UserAuthContextprovider>        
        </Col>
      </Row>
    </Container>
  );
}

export default App;
