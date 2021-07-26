import Feed from "./components/Feed";
import Header from "./components/Header";
import Suggestions from "./components/Suggestions";
import { useSelector } from "react-redux";
import { selectUser } from "./slices/userSlice";
import Login from "./components/Login";

function App() {
  const user = useSelector(selectUser);

  return user ? (
    <div className="relative h-screen bg-gray-50 overflow-hidden pb-42">
      <Header />

      <main className="relative py-5 px-5 md:px-20 lg:px-5">
        <div className="max-w-[59rem] mx-auto grid grid-cols-2 lg:grid-cols-3 space-x-6">
          <Feed />
          <Suggestions />
        </div>
      </main>
    </div>
  ) : (
    <Login />
  );
}

export default App;
