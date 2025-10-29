import { useEffect, useState } from "react";
import { API } from "../api/api";
import "../styles/Dashboard.css";
import {
  Pencil,
  Trash2,
  FileText,
  Plus,
  Star,
  Filter,
  Search,
  Eye,
  Calendar,
} from "lucide-react";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    Id: 0,
    Title: "",
    Content: "",
    ImageUrl: "",
    VideoUrl: "",
    IsFeatured: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await API.getPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      console.error(err);
      setError("فشل في جلب البوستات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // فلترة البوستات عند تغيير الفلتر أو البحث
  useEffect(() => {
    let result = posts;

    if (filter === "featured") {
      result = result.filter((post) => post.IsFeatured);
    } else if (filter === "regular") {
      result = result.filter((post) => !post.IsFeatured);
    }

    if (searchTerm) {
      result = result.filter(
        (post) =>
          post.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.Content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(result);
  }, [filter, searchTerm, posts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Title", formData.Title);
      formDataToSend.append("Content", formData.Content);
      formDataToSend.append("VideoUrl", formData.VideoUrl || "");
      formDataToSend.append("IsFeatured", formData.IsFeatured);

      if (formData.ImageFile) {
        formDataToSend.append("imageFile", formData.ImageFile);
      }

      if (editingId) {
        await API.editAdminPost(editingId, formDataToSend);
        setSuccess("تم تحديث البوست بنجاح");
      } else {
        await API.createAdminPost(formDataToSend);
        setSuccess("تم إضافة البوست بنجاح");
      }

      setShowModal(false);
      fetchPosts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء الحفظ");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleEdit = (post) => {
    setFormData(post);
    setEditingId(post.Id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا البوست؟")) return;
    try {
      await API.deleteAdminPost(id);
      fetchPosts();
      setSuccess("تم حذف البوست بنجاح");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء الحذف");
      setTimeout(() => setError(""), 5000);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowModal(false);
    setFormData({
      Id: 0,
      Title: "",
      Content: "",
      ImageUrl: "",
      VideoUrl: "",
      IsFeatured: false,
    });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      Id: 0,
      Title: "",
      Content: "",
      ImageUrl: "",
      VideoUrl: "",
      IsFeatured: false,
    });
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ar-EG", options);
  };

  return (
    <div className="dashboard-main-container">
      {/* Header */}
      <header className="dashboard-main-header">
        <div className="dashboard-header-content">
          <div className="dashboard-header-badge">
            <FileText size={20} />
            <span>لوحة التحكم</span>
          </div>
          <h1>إدارة البوستات</h1>
          <p>قم بإدارة وعرض جميع البوستات في الموقع بسهولة</p>
        </div>
        <div className="dashboard-header-actions">
          <div className="dashboard-search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="ابحث في البوستات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="dashboard-btn-add" onClick={openAddModal}>
            <Plus size={18} />
            إضافة بوست جديد
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="dashboard-stats-container">
        <div className="dashboard-stat-card">
          <div className="stat-icon total">
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <h3>إجمالي البوستات</h3>
            <span className="stat-number">{posts.length}</span>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="stat-icon featured">
            <Star size={24} />
          </div>
          <div className="stat-info">
            <h3>البوستات المميزة</h3>
            <span className="stat-number">
              {posts.filter((p) => p.IsFeatured).length}
            </span>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="stat-icon regular">
            <Eye size={24} />
          </div>
          <div className="stat-info">
            <h3>البوستات العادية</h3>
            <span className="stat-number">
              {posts.filter((p) => !p.IsFeatured).length}
            </span>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="dashboard-alerts-container">
        {error && (
          <div className="dashboard-alert dashboard-alert-error">
            <div className="alert-content">
              <span className="alert-icon">⚠️</span>
              <span>{error}</span>
            </div>
            <button className="alert-close" onClick={() => setError("")}>
              ×
            </button>
          </div>
        )}
        {success && (
          <div className="dashboard-alert dashboard-alert-success">
            <div className="alert-content">
              <span className="alert-icon">✅</span>
              <span>{success}</span>
            </div>
            <button className="alert-close" onClick={() => setSuccess("")}>
              ×
            </button>
          </div>
        )}
      </div>

      {/* Posts Section */}
      <section className="dashboard-posts-section">
        <div className="dashboard-section-header">
          <div className="section-title">
            <h2>قائمة البوستات</h2>
            <span className="dashboard-posts-count">
              {filteredPosts.length} بوست
            </span>
          </div>

          <div className="section-controls">
            <div className="dashboard-filters-container">
              <Filter size={16} />
              <button
                className={`dashboard-filter-btn ${
                  filter === "all" ? "dashboard-filter-btn-active" : ""
                }`}
                onClick={() => setFilter("all")}
              >
                الكل
              </button>
              <button
                className={`dashboard-filter-btn ${
                  filter === "featured" ? "dashboard-filter-btn-active" : ""
                }`}
                onClick={() => setFilter("featured")}
              >
                المميزة
              </button>
              <button
                className={`dashboard-filter-btn ${
                  filter === "regular" ? "dashboard-filter-btn-active" : ""
                }`}
                onClick={() => setFilter("regular")}
              >
                العادية
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="dashboard-loading">
            <div className="loading-spinner"></div>
            <p>جاري تحميل البوستات...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="dashboard-empty-state">
            <div className="empty-icon">
              <FileText size={80} />
            </div>
            <h3>لا توجد بوستات</h3>
            <p>
              {searchTerm
                ? "لم نتمكن من العثور على أي بوستات تطابق بحثك"
                : "لم تقم بإضافة أي بوستات بعد"}
            </p>
            {!searchTerm && (
              <button
                className="dashboard-btn-add empty-btn"
                onClick={openAddModal}
              >
                <Plus size={18} />
                إضافة أول بوست
              </button>
            )}
          </div>
        ) : (
          <div className="dashboard-posts-grid">
            {filteredPosts.map((post) => (
              <div
                key={post.Id}
                className={`dashboard-post-card ${
                  post.IsFeatured ? "featured" : ""
                }`}
              >
                {post.IsFeatured && (
                  <div className="featured-badge">
                    <Star size={14} fill="currentColor" />
                    مميز
                  </div>
                )}

                <div className="post-header">
                  <h3 className="post-title">{post.Title}</h3>
                  <div className="post-meta">
                    <span className="post-id">#{post.Id}</span>
                    {post.CreatedAt && (
                      <span className="post-date">
                        <Calendar size={14} />
                        {formatDate(post.CreatedAt)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="post-content">
                  <p>
                    {post.Content.length > 120
                      ? `${post.Content.substring(0, 120)}...`
                      : post.Content}
                  </p>
                </div>

                {post.ImageUrl && (
                  <div className="post-image">
                    <img src={post.ImageUrl} alt={post.Title} />
                  </div>
                )}

                <div className="post-actions">
                  <button
                    className="dashboard-btn-edit"
                    onClick={() => handleEdit(post)}
                  >
                    <Pencil size={16} />
                    تعديل
                  </button>
                  <button
                    className="dashboard-btn-delete"
                    onClick={() => handleDelete(post.Id)}
                  >
                    <Trash2 size={16} />
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="dashboard-modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("dashboard-modal-overlay")) {
              cancelEdit();
            }
          }}
        >
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h2>{editingId ? "تعديل البوست" : "إضافة بوست جديد"}</h2>
              <button className="dashboard-modal-close" onClick={cancelEdit}>
                ×
              </button>
            </div>

            <form className="dashboard-form" onSubmit={handleSubmit}>
              <div className="dashboard-form-group">
                <label htmlFor="title">عنوان البوست</label>
                <input
                  id="title"
                  type="text"
                  placeholder="أدخل عنوان البوست..."
                  value={formData.Title}
                  onChange={(e) =>
                    setFormData({ ...formData, Title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="dashboard-form-group">
                <label htmlFor="content">محتوى البوست</label>
                <textarea
                  id="content"
                  placeholder="اكتب محتوى البوست هنا..."
                  value={formData.Content}
                  onChange={(e) =>
                    setFormData({ ...formData, Content: e.target.value })
                  }
                  required
                />
              </div>

              <div className="dashboard-form-group">
                <label htmlFor="image">صورة البوست</label>
                <div className="file-upload-container">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData({ ...formData, ImageFile: file });
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData((prev) => ({
                            ...prev,
                            ImageUrl: reader.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <label htmlFor="image" className="file-upload-label">
                    اختر صورة
                  </label>
                </div>

                {formData.ImageUrl && (
                  <div className="image-preview">
                    <img src={formData.ImageUrl} alt="معاينة الصورة" />
                  </div>
                )}
              </div>

              <div className="dashboard-form-group dashboard-checkbox-group">
                <label className="dashboard-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.IsFeatured}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        IsFeatured: e.target.checked,
                      })
                    }
                  />
                  <span className="dashboard-checkbox-custom"></span>
                  تمييز البوست
                </label>
              </div>

              <div className="dashboard-form-actions">
                <button type="submit" className="dashboard-btn-primary">
                  {editingId ? "تحديث البوست" : "إضافة البوست"}
                </button>
                <button
                  type="button"
                  className="dashboard-btn-secondary"
                  onClick={cancelEdit}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
