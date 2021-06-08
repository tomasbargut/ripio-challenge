import Main from './components/Main';
import { AuthContextWrapper } from './contexts/AuthContext';
import {config} from './utils';
function App() {
  config();
  return (
    <AuthContextWrapper >
      <Main />
    </AuthContextWrapper>
  );
}

export default App;
