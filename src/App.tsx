import './App.css';
import Timer from './components/Timer';

function App() {
  return (
    <>
      <main className="container mx-auto gap-x-4 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-lg mx-auto">
          <Timer></Timer>
        </div>
      </main>
    </>
  );
}

export default App;
