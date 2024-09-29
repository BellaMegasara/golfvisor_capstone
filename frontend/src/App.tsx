import { Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import Details from "./views/Details";
import Error from "./views/Error";
import AddGolfCourse from "./views/AddGolfCourse";
import Discover from "./views/Discover";
import { Home } from "@mui/icons-material";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/home" element={<Home />} />
      <Route path="/details" element={<Details />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/addgolfcourse" element={<AddGolfCourse />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
