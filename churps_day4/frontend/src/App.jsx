import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Kurta from "./collection/men/Kurta"
import Shirt from "./collection/men/Shirt"
import Suits from "./collection/men/Suits"
import CartPage from "./pages/CartPage"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/men/kurtas" element={<Kurta />} />
        <Route path="/men/shirts" element={<Shirt />} />
        <Route path="/men/suits" element={<Suits />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
