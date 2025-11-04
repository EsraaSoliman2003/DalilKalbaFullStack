import { Facebook, Ghost, Instagram, Twitter, Music } from "lucide-react";
import { FaTiktok, FaThreads } from "react-icons/fa6";
import "../styles/Social.css";

const Social = () => {
  return (
    <section id="social" className="social-section">
      <div className="section-header">
        <h2>تابعنا على</h2>
        <div className="section-divider"></div>
      </div>

      <div className="social-icons">
        <a
          href="https://www.tiktok.com/@dlil.kalba"
          target="_blank"
          rel="noreferrer"
          className="social-icon tiktok"
        >
          <FaTiktok size={28} />
        </a>
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
        <a
          href="https://x.com/dlilkalba?s=21"
          target="_blank"
          rel="noreferrer"
          className="social-icon twitter"
        >
          <Twitter size={28} />
        </a>
        <a
          href="https://www.instagram.com/dlil_kalba/"
          target="_blank"
          rel="noreferrer"
          className="social-icon instagram"
        >
          <Instagram size={28} />
        </a>
        <a
          href="https://www.threads.com/@dlil_kalba"
          target="_blank"
          rel="noreferrer"
          className="social-icon threads"
        >
          <FaThreads size={28} />
        </a>
      </div>
    </section>
  );
};

export default Social;
