import logoLight from "../assets/logoLight.png";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logoLight} alt="شعار كلباء" />
        </div>
        <p>&copy; 2025 مدينة كلباء - جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};

export default Footer;