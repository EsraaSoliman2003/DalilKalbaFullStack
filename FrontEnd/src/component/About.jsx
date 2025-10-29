import kalbaImage from "../assets/kalba.jpg";
import "../styles/About.css";

const About = () => {
  return (
    <section id="about">
      <div className="about-section">
        <div className="section-header">
          <h2>عن كلباء</h2>
          <div className="section-divider"></div>
          <p>اكتشف جمال الطبيعة والتراث</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <div className="feature-highlights">
              <div className="feature">
                <div className="feature-icon">🌊</div>
                <div className="feature-text">
                  <h4>شواطئ خلابة</h4>
                  <p>شواطئ هادئة تلتقي مع جبال حفيت</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🌿</div>
                <div className="feature-text">
                  <h4>محميات طبيعية</h4>
                  <p>محمية القرم وموائل فريدة</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🏺</div>
                <div className="feature-text">
                  <h4>تراث عريق</h4>
                  <p>تاريخ يمتد لآلاف السنين</p>
                </div>
              </div>
            </div>
            <p className="about-description">
              تقع مدينة كلباء على الساحل الشرقي لدولة الإمارات العربية
              المتحدة، وتُعد من أجمل المدن التابعة لإمارة الشارقة. تتميز
              بطبيعتها الخلابة وشواطئها الهادئة ومواقعها البيئية الفريدة مثل
              محمية القرم وبيت القصب التاريخي.
            </p>
          </div>
          <div className="about-gallery">
            <div className="gallery-main">
              <img src={kalbaImage} alt="منظر من كلباء" />
            </div>
            <div className="gallery-thumbnails">
              <div className="thumbnail"></div>
              <div className="thumbnail"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;