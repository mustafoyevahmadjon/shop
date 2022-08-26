import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Shop />
      <Footer />
    </>
  )
}
export default App;