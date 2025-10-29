import "../styles/Map.css";

const Map = () => {
  return (
    <section id="map">
      <div className="map-section">
        <div className="section-header">
          <h2>موقع كلباء</h2>
          <div className="section-divider"></div>
          {/* <p>اكتشف جميع البوستات العادية</p> */}
        </div>
        <div
          className="map-frame"
          style={{
            position: "relative",
            width: "100%",
            height: "400px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.697188207848!2d56.3508!3d25.0973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef47497efb6a0e3%3A0xfedbfccaa9bfa31d!2z2YXYt9i52YUg2KfZhNi52YTZiiDZhNmE2KfZhdi52YUg2KfZhNin2YXZiiDZhNmE2LnZhdmI2KfZhQ!5e0!3m2!1sar!2sae!4v1700000000000!5m2!1sar!2sae"
            style={{
              width: "100%",
              height: "100%",
              border: "0",
              pointerEvents: "auto",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="خريطة كلباء"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Map;
