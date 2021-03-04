import Particles from "react-tsparticles";
import { particlesMainBackground } from "./Particles";
import Auth from "./pages/auth/Auth";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Particles params={particlesMainBackground} />
      <Auth />
    </AuthProvider>
  );
}

export default App;
