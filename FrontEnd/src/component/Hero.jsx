import { useEffect, useState } from "react";
import logoLight from "../assets/logoLight.png";
import { API } from "../api/api";
import "../styles/Hero.css";

const Hero = ({ scrollToSection }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await API.getNews();
        setNews(data);
      } catch (error) {
        console.error("فشل في جلب الأخبار:", error);
      }
    };

    fetchNews();
  }, []);

  const newsText =
    news.length > 0
      ? news.map((n) => n.text || n.Text).join(" | ")
      : "📰 لا توجد أخبار حالياً";

  return (
    <section id="home">
      <div className="hero">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">وجهة الطبيعة والتراث</div>
            <h1 className="hero-title">
              <span className="title-main">دليل كلباء</span>
              <span className="title-sub">جوهرة الساحل الشرقي</span>
            </h1>
            <p className="hero-subtitle">
              حيث يلتقي البحر بالجبل، والطبيعة بالتاريخ في إمارة الشارقة
            </p>
            <div className="hero-actions">
              <button
                className="btn-primary"
                onClick={() => scrollToSection("featuredPosts")}
              >
                اكتشف الأماكن
              </button>
              <button
                className="btn-secondary"
                onClick={() => scrollToSection("about")}
              >
                تعرف على المدينة
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="logo-orb">
              <img src={logoLight} alt="شعار كلباء" />
              <div className="orb-glow"></div>
            </div>
          </div>
        </div>
        <div className="news-bar">
          <div className="news-text">{newsText}</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
