import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Hero from "./component/Hero";
import About from "./component/About";
import Posts from "./component/Posts";
import Social from "./component/Social";
import Map from "./component/Map";
import Contact from "./component/Contact";
import Footer from "./component/Footer";
import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./component/PrivateRoute";
import { API } from "./api/api";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await API.getPosts();
        setPosts(allPosts.filter((p) => !p.IsFeatured));
        setFeaturedPosts(allPosts.filter((p) => p.IsFeatured));
      } catch (err) {
        console.error(err);
        setError("فشل في جلب البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="App">
      {location.pathname !== "/login" && (
        <Header
          isScrolled={isScrolled}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero scrollToSection={scrollToSection} />
              <About />
              {/* 👇 تمرير البوستات العادية */}
              <Posts
                id="posts"
                featured={false}
                posts={posts}
                error={error}
                loading={loading}
              />

              {/* 👇 تمرير البوستات المميزة */}
              <Posts
                id="featuredPosts"
                featured={true}
                posts={featuredPosts}
                error={error}
                loading={loading}
              />
              <Social />
              <Map />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
