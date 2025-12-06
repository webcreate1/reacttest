import "./App.css";
import Header from "./component/Header";
import Chat from "./component/Chat";
import Footer from "./component/Footer";
function App() {
  return (
    <div className="w-screen">
      <div className="m-2">
        <Header />
        <Chat />
      </div>
    </div>
  );
}

export default App;
