import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { API_URL } from "@/lib/api";

const DEFAULT_FORM = {
  category: "",
  title: "",
  excerpt: "",
  platform: "",
  readTime: "",
  url: ""
};

export function Admin() {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchArticles();
    }
  }, [token]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${API_URL}/articles`);
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to fetch articles", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/admin/login`, { username, password });
      localStorage.setItem("adminToken", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  const openNewArticle = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setShowModal(true);
  };

  const openEditArticle = (article: any) => {
    setEditingId(article.id);
    setFormData({
      category: article.category || "",
      title: article.title || "",
      excerpt: article.excerpt || "",
      platform: article.platform || "",
      readTime: article.readTime || "",
      url: article.url || ""
    });
    setShowModal(true);
  };

  const confirmDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await axios.delete(`${API_URL}/articles/${deleteConfirmId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchArticles();
      setDeleteConfirmId(null);
    } catch (err) {
      alert("Failed to delete article");
      console.error(err);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(articles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setArticles(items);

    const payload = items.map((item, index) => ({ id: item.id, order: index }));

    try {
      await axios.put(`${API_URL}/articles/reorder`, { items: payload }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to reorder articles", err);
      fetchArticles();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editingId) {
        await axios.put(`${API_URL}/articles/${editingId}`, formData, config);
      } else {
        await axios.post(`${API_URL}/articles`, formData, config);
      }
      setShowModal(false);
      fetchArticles();
    } catch (err) {
      alert("Failed to save article");
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#FAFAF7] font-serif">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-2xl shadow-[0_10px_40px_rgba(28,74,46,.1)] flex flex-col gap-5 w-full max-w-sm border-[1.5px] border-[#E0DCD2]">
          <h2 className="text-3xl text-center text-[#1C4A2E] tracking-tight">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-[1.5px] border-[#E0DCD2] px-4 py-3 rounded-lg focus:outline-none focus:border-[#1C4A2E] transition-colors font-sans"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[1.5px] border-[#E0DCD2] px-4 py-3 rounded-lg focus:outline-none focus:border-[#1C4A2E] transition-colors font-sans"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1C4A2E] text-white font-semibold tracking-wide py-3 rounded-lg hover:bg-[#2A6840] transition-colors mt-2 font-sans"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#FAFAF7] p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-serif text-4xl text-[#1C4A2E]">Admin Dashboard</h1>
          <button onClick={handleLogout} className="border-[1.5px] border-[#1C4A2E] text-[#1C4A2E] px-5 py-2 rounded-full font-semibold hover:bg-[#1C4A2E] hover:text-white transition-colors">Logout</button>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border-[1.5px] border-[#E0DCD2] relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#1C4A2E]">Writing Section Articles</h2>
            <button 
              onClick={openNewArticle}
              className="bg-[#1C4A2E] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#2A6840] transition-colors"
            >
              + New Article
            </button>
          </div>
          
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="articles-grid" direction="horizontal">
              {(provided) => (
                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {articles.length === 0 ? (
                    <p className="text-black/50 italic col-span-full">No articles found. Create one above.</p>
                  ) : (
                    articles.map((article, index) => (
                      <Draggable key={article.id} draggableId={article.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...(provided.draggableProps as React.HTMLAttributes<HTMLDivElement>)}
                            {...provided.dragHandleProps}
                            className="bg-white border-[1.5px] border-[#E0DCD2] rounded-[16px] p-6 flex flex-col hover:border-[#1C4A2E] hover:shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing"
                          >
                            <span className="text-[0.6875rem] font-semibold tracking-widest uppercase text-[#1C4A2E] mb-4">{article.category}</span>
                            <h3 className="font-serif text-[clamp(1rem,1.4vw,1.3rem)] leading-[1.3] mb-3.5 flex-1">{article.title}</h3>
                            <p className="text-sm text-black/50 leading-[1.6] mb-5 line-clamp-3 overflow-hidden">{article.excerpt}</p>
                            
                            <div className="flex justify-between items-center text-[0.8125rem] font-semibold text-[#1C4A2E] pt-4 border-t border-[#E0DCD2]">
                              <span>{article.platform}{article.readTime ? ` · ${article.readTime}` : ""}</span>
                              <div className="flex gap-3 relative z-10" onClick={e => e.stopPropagation()}>
                                <button onClick={() => openEditArticle(article)} className="text-sm font-medium text-black/50 hover:text-[#1C4A2E]">Edit</button>
                                <button onClick={() => confirmDelete(article.id)} className="text-sm font-medium text-red-500 hover:text-red-700">Delete</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {deleteConfirmId && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setDeleteConfirmId(null)}
        >
          <div 
            className="bg-white rounded-[20px] p-8 max-w-sm w-full shadow-2xl border-[1px] border-[#E0DCD2] animate-in zoom-in-95 duration-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-[#1C4A2E]/10 rounded-full flex items-center justify-center mx-auto mb-5 text-[#1C4A2E] text-2xl font-bold">
              !
            </div>
            <h3 className="font-serif text-2xl text-[#1A2F25] mb-2">Delete Article?</h3>
            <p className="text-black/60 text-[0.95rem] mb-8 leading-relaxed">Are you sure you want to delete this article? This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setDeleteConfirmId(null)} 
                className="flex-1 px-5 py-3 rounded-xl border-[1.5px] border-[#E0DCD2] text-[#1C4A2E] font-semibold hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="flex-1 px-5 py-3 rounded-xl bg-[#1C4A2E] text-white font-semibold hover:bg-[#2A6840] transition-colors shadow-md shadow-[#1C4A2E]/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-sm p-8 max-w-2xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-h-[90vh] overflow-y-auto border-t-[6px] border-t-[#1C4A2E] border-x border-b border-[#E0DCD2] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-3xl text-[#1A2F25] mb-8 pb-4 border-b border-[#E0DCD2]/60">
              {editingId ? "Edit Article" : "New Article"}
            </h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1A2F25]">Category (e.g. Client-Side Insider)</label>
                <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-white border border-[#E0DCD2] px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#1C4A2E] focus:ring-1 focus:ring-[#1C4A2E] transition-all text-[#1A2F25]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1A2F25]">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-white border border-[#E0DCD2] px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#1C4A2E] focus:ring-1 focus:ring-[#1C4A2E] transition-all text-[#1A2F25]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1A2F25]">Excerpt</label>
                <textarea required value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} rows={3} className="bg-white border border-[#E0DCD2] px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#1C4A2E] focus:ring-1 focus:ring-[#1C4A2E] transition-all resize-none text-[#1A2F25]" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1A2F25]">Platform (e.g. Medium, LinkedIn)</label>
                  <input required type="text" value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} className="bg-white border border-[#E0DCD2] px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#1C4A2E] focus:ring-1 focus:ring-[#1C4A2E] transition-all text-[#1A2F25]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1A2F25]">Read Time (Optional)</label>
                  <input type="text" value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} className="bg-white border border-[#E0DCD2] px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#1C4A2E] focus:ring-1 focus:ring-[#1C4A2E] transition-all text-[#1A2F25]" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1A2F25]">URL / Link</label>
                <input required type="url" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="bg-white border border-[#E0DCD2] px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#1C4A2E] focus:ring-1 focus:ring-[#1C4A2E] transition-all text-[#1A2F25]" />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[#E0DCD2]/60">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-sm border border-[#E0DCD2] text-[#1A2F25] font-semibold hover:bg-black/5 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={formLoading} className="bg-[#1C4A2E] text-white px-8 py-2.5 rounded-sm font-semibold hover:bg-[#1A2F25] transition-colors">
                  {formLoading ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
