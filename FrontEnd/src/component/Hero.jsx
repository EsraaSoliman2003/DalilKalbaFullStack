import { useEffect, useState } from "react";
import logoLight from "../assets/logoLight.png";
import { API } from "../api/api";
import "../styles/Hero.css";
import clientImage from "../assets/client.png";

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
      : "لا توجد أخبار حالياً";

  return (
    <section id="home">
      <div className="hero">
        {/* News Bar - Moved to the very top */}
        <div className="news-bar">
          <div className="news-text">{newsText}</div>
        </div>

        {/* Client Section - Below news bar */}
        <div className="client-section">
          <div className="client-content">
            <div className="client-image-container">
              <img src={clientImage} alt="محمد - مؤسس منصة دليل كلباء" className="client-image" />
            </div>
            <div className="client-text">
              <p>
                مؤسس منصة دليل كلباء منذ عام 2015، وواحد من أبرز صُنّاع المحتوى المحلي في مدينة كلباء. 
                تخصّص في توثيق الأحداث والفعاليات الرسمية والمجتمعية، وساهم في إبراز هوية المدينة السياحية 
                والتراثية عبر تغطيات دقيقة واحترافية.
              </p>
            </div>
          </div>
        </div>

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
      </div>
    </section>
  );
};

export default Hero;