import { useReactiveVar } from '@apollo/client';
import {HashRouter as Router} from 'react-router-dom'
import { isLoggedInVar } from './apollo';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  return (
    <div>
      <Router>
        
      </Router>
    </div>
  );
}

export default App;
