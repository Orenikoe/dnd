import './App.css';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { UserContextProvider } from "./services/localStorage.service";

function App() {
	return (
		<UserContextProvider>
		<div className="App">
      <Navbar/>
      <Main/>
		</div>
		</UserContextProvider>
	);
}

export default App;
