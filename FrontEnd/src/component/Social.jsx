import { Facebook, Ghost } from "lucide-react";
import "../styles/Social.css";

const Social = () => {
  return (
    <section id="social" className="social-section">
      <div className="section-header">
        <h2>تابعنا على</h2>
        <div className="section-divider"></div>
        {/* <p>اكتشف جميع البوستات العادية</p> */}
      </div>
      <div className="social-icons">
        <a
          href="https://www.facebook.com/dlil.kalba"
          target="_blank"
          rel="noreferrer"
          className="social-icon facebook"
        >
          <Facebook size={28} />
        </a>
        <a
          href="https://snapchat.com/t/VWO8YtR3"
          target="_blank"
          rel="noreferrer"
          className="social-icon snapchat"
        >
          <Ghost size={28} />
        </a>
      </div>
    </section>
  );
};

export default Social;
