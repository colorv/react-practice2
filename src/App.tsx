import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";
import Series from "./Routes/Series";
import Latest from "./Routes/Latest";
import MyList from "./Routes/MyList";
import OriginalAudio from "./Routes/OriginalAudio";

function App() {
  // regex사용해서 movieID number로만 받기
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":movieId" element={<Home />} />
        </Route>
        <Route path="series" element={<Series />}>
          <Route path=":movieId" element={<Series />} />
        </Route>
        <Route path="movies" element={<Movie />}>
          <Route path=":movieId" element={<Movie />} />
        </Route>
        <Route path="latest" element={<Latest />}>
          <Route path=":movieId" element={<Latest />} />
        </Route>
        <Route path="my-list" element={<MyList />}>
          <Route path=":movieId" element={<MyList />} />
        </Route>
        <Route path="original-audio" element={<OriginalAudio />}>
          <Route path=":movieId" element={<OriginalAudio />} />
        </Route>
        <Route path="search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
