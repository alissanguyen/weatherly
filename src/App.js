import logo from './logo.svg';
import './App.css';


/**
 * BASIC FEATURES
 * 1. Refresh every 5-10 minutes with the exact temp and weather conditions
 * 2. Should have responsive designs
 * 3. Choose and display location and date
 */

 /**
  * ADVANCED FEATURES
  * 1. Users can click on a specific day to see the hourly forecast
  * 2. Add graphic library like 'vx'
  */
 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Blue Sky
        </h1>
      </header>
    </div>
  );
}

export default App;
