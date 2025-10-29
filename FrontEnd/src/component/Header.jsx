import { useRef, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoLight from "../assets/logoLight.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ isScrolled, activeSection, scrollToSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const expiresAt = localStorage.getItem("expiresAt");

      if (token && expiresAt) {
        const now = new Date();
        const expiryDate = new Date(expiresAt);
        if (now < expiryDate) {
          setIsLoggedIn(true);
          return;
        }
      }

      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt");
      setIsLoggedIn(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    setIsLoggedIn(false);
    navigate("/");
    setIsMenuOpen(false);
  };

  const getSectionName = (section) => {
    const names = {
      home: "الرئيسية",
      about: "عن كلباء",
      posts: "لمحات من كلباء",
      featuredPosts: "الأماكن السياحية",
      social: "تابعنا",
      map: "الخريطة",
      contact: "تواصل معنا",
      dashboard: "لوحة التحكم",
    };
    return names[section] || section;
  };

  const handleSectionClick = (section) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(section), 400);
    } else {
      scrollToSection(section);
    }
  };

  const isInDashboard = location.pathname.startsWith("/dashboard");

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* زر تسجيل الدخول أو الخروج */}
        {isLoggedIn ? (
          <button
            className="nav-link login-button btnDesktop"
            onClick={handleLogout}
          >
            تسجيل الخروج
          </button>
        ) : (
          <button
            className="nav-link login-button btnDesktop"
            onClick={() => {
              navigate("/login");
              setIsMenuOpen(false);
            }}
          >
            تسجيل الدخول
          </button>
        )}

        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
          {[
            "home",
            "about",
            "posts",
            "featuredPosts",
            "social",
            "map",
            "contact",
          ].map((section) => (
            <button
              key={section}
              className={`nav-link ${
                !isInDashboard && activeSection === section ? "active" : ""
              }`}
              onClick={() => handleSectionClick(section)}
            >
              {getSectionName(section)}
            </button>
          ))}

          {isLoggedIn && (
            <button
              className={`nav-link ${isInDashboard ? "active" : ""}`}
              onClick={() => {
                navigate("/dashboard");
                setIsMenuOpen(false);
              }}
            >
              {getSectionName("dashboard")}
            </button>
          )}

          {!isLoggedIn && (
            <button
              className="nav-link login-button btnMopile"
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
            >
              تسجيل الدخول
            </button>
          )}

          {isLoggedIn && (
            <button
              className="nav-link login-button btnMopile"
              onClick={handleLogout}
            >
              تسجيل الخروج
            </button>
          )}
        </nav>

        <button
          ref={menuButtonRef}
          className="mobile-menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={40} /> : <Menu size={40} />}
        </button>

        <div className="logo-wrapper">
          <img src={logoLight} alt="شعار كلباء" className="header-logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
