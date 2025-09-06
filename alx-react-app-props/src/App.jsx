

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import WelcomeMessage from "./components/WelcomeMessage";
import UserProfile from "./components/UserProfile";
import Counter from "./components/Counter";
import { UserContext } from "./components/UserContext";
import ProfilePage from "./components/ProfilePage";


function App() {

  const userData = { name: "Jane Doe", email: "jame.doe.example.com" };
  return (
    <>
      <Header />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <UserContext.Provider value={ userData }>
        <ProfilePage/>
      </UserContext.Provider>
      <MainContent />
      <WelcomeMessage />
      <Counter />
      <Footer />
    </>
  )
}

export default App
