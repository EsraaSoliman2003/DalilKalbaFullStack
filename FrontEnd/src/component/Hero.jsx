import logoLight from "../assets/logoLight.png";
import "../styles/Hero.css";

const Hero = ({ scrollToSection }) => {
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
                onClick={() => scrollToSection("attractions")}
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
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;