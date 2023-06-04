import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Series from "./pages/Series";
import Latest from "./pages/Latest";
import MyList from "./pages/MyList";
import OriginalAudio from "./pages/OriginalAudio";
import { PATH } from "./constants/path";

function App() {
  // regex사용해서 movieID number로만 받기
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Nav />
      <Routes>
        <Route path={PATH.HOME} element={<Home />}>
          <Route path={PATH.MOVIEID} element={<Home />} />
        </Route>
        <Route path={PATH.SERIES} element={<Series />}>
          <Route path={PATH.MOVIEID} element={<Series />} />
        </Route>
        <Route path={PATH.MOVIE} element={<Movie />}>
          <Route path={PATH.MOVIEID} element={<Movie />} />
        </Route>
        <Route path={PATH.LATEST} element={<Latest />}>
          <Route path={PATH.MOVIEID} element={<Latest />} />
        </Route>
        <Route path={PATH.MYLIST} element={<MyList />}>
          <Route path={PATH.MOVIEID} element={<MyList />} />
        </Route>
        <Route path={PATH.ORIGINALAUDIO} element={<OriginalAudio />}>
          <Route path={PATH.MOVIEID} element={<OriginalAudio />} />
        </Route>
        <Route path={PATH.SEARCH} element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
