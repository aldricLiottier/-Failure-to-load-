import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArticleCreate from "./pages/ArticleCreate";
import Article from "./pages/Article";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route index element={<Home/>} />
          <Route path="/article/:id" element={<Article/>} />
          <Route path="/article-create" element={<ArticleCreate/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<NoPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}