import { useState } from "react";
import PostCard from "./common/PostCard";
import { API } from "../api/api";
import "../styles/Posts.css";

const Posts = ({ id, featured, posts, error, loading }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (loading) {
    return (
      <section id={id}>
        <div className="posts-section">
          <div className="section-header">
            <h2>{featured ? "الأماكن السياحية" : "لمحات من كلباء"}</h2>
            <div className="section-divider"></div>
            <p>
              {featured
                ? "اكتشف أجمل الوجهات في كلباء"
                : "استكشف أجمل اللقطات من المدينة"}
            </p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>جاري التحميل...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id}>
      <div className="posts-section">
        <div className="section-header">
          <h2>{featured ? "الأماكن السياحية" : "لمحات من كلباء"}</h2>
          <div className="section-divider"></div>
          <p>
            {featured
              ? "اكتشف أجمل الوجهات في كلباء"
              : "استكشف أجمل اللقطات من المدينة"}
          </p>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="posts-grid">
          {posts.length > 0 ? (
            posts
              .slice(0, visibleCount)
              .map((post, index) => <PostCard key={index} post={post} />)
          ) : (
            <div className="no-posts">
              <div className="no-posts-icon">
                <div className="icon-wrapper"></div>
              </div>
              <h3>لا توجد منشورات حالياً</h3>
              <p>نعمل على إضافة محتوى جديد قريباً. ترقبوا أجمل اللقطات!</p>
              <div className="no-posts-decoration">
                <div className="decoration-circle"></div>
                <div className="decoration-circle"></div>
                <div className="decoration-circle"></div>
              </div>
            </div>
          )}
        </div>

        {/* زر عرض المزيد */}
        {visibleCount < posts.length && (
          <div className="see-more-container">
            <button className="see-more-btn" onClick={handleSeeMore}>
              عرض المزيد
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Posts;
