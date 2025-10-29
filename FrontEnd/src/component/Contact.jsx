import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "../styles/Contact.css";

const Contact = () => {
  const formRef = useRef();
  const [messageStatus, setMessageStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessageStatus(null);

    emailjs
      .sendForm(
        "service_9mxubqg",
        "template_40qi4dh",
        formRef.current,
        "7LjUOeFIH_3CGasy6"
      )
      .then(
        () => {
          setIsLoading(false);
          setMessageStatus({
            type: "success",
            text: "✅ تم إرسال الرسالة بنجاح",
          });
          formRef.current.reset();
        },
        () => {
          setIsLoading(false);
          setMessageStatus({
            type: "error",
            text: "❌ حدث خطأ أثناء الإرسال",
          });
        }
      );

    setTimeout(() => setMessageStatus(null), 5000);
  };

  return (
    <section id="contact">
      <div className="contact-section">
        <div className="section-header">
          <h2>تواصل معنا</h2>
          <div className="section-divider"></div>
          <p>نحن هنا للإجابة على استفساراتك</p>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-header">
              <h3>ابق على تواصل</h3>
              <p>نحن سعداء بتواصلكم معنا في أي وقت</p>
            </div>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="method-content">
                  <h4>العنوان</h4>
                  <p>مدينة كلباء، إمارة الشارقة</p>
                  <span>الإمارات العربية المتحدة</span>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="method-content">
                  <h4>ساعات العمل</h4>
                  <p>الأحد - الخميس: 8:00 - 16:00</p>
                  <span>الجمعة والسبت: مغلق</span>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <div className="form-header">
              <h3>أرسل رسالة</h3>
              <p>سنكون سعداء بسماع منك</p>
            </div>
            <form ref={formRef} onSubmit={sendEmail} className="message-form">
              <div className="form-group">
                <label htmlFor="name">الاسم الكامل</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">الموضوع</label>
                <select id="subject" required>
                  <option value="">اختر الموضوع</option>
                  <option value="inquiry">استفسار عام</option>
                  <option value="tourism">معلومات سياحية</option>
                  <option value="event">الفعاليات</option>
                  <option value="partnership">شراكة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">الرسالة</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="اكتب رسالتك هنا..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loader"></span>
                    <span style={{ marginLeft: "8px" }}>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <span>إرسال الرسالة</span>
                    <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </button>
              {messageStatus && (
                <p
                  className={`status-message ${
                    messageStatus.type === "success"
                      ? "success-message"
                      : "error-message"
                  }`}
                >
                  {messageStatus.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;