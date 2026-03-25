import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const data = await res.json();
      setPosts(data.slice(0, 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedPosts = [...filtered].sort((a, b) => {
    return sortOrder === "desc" ? b.id - a.id : a.id - b.id;
  });

  if (error)
    return (
      <div style={{ color: "red", textAlign: "center" }}>Error: {error}</div>
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "8px",
        }}
      >
        <h2
          style={{
            color: "#2d3748",
            borderBottom: "2px solid #1e40af",
            paddingBottom: "0.5rem",
            margin: 0,
          }}
        >
          โพสต์ล่าสุด
        </h2>

        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <button
            onClick={fetchPosts}
            disabled={loading}
            style={{
              background: "white",
              border: "1px solid #cbd5e0",
              padding: "0.3rem 0.6rem",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "0.85rem",
            }}
          >
            {loading ? "⌛ โหลดอยู่..." : "🔄 โหลดใหม่"}
          </button>

          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            style={{
              background: "#edf2f7",
              border: "1px solid #cbd5e0",
              padding: "0.3rem 0.6rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.85rem",
              color: "#1e40af",
            }}
          >
            {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
          </button>
        </div>
      </div>

      <PostCount count={posts.length} />

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "6px",
          marginBottom: "1rem",
          border: "1px solid #cbd5e0",
          boxSizing: "border-box",
        }}
      />

      <div>
        {loading ? (
          <PostSkeleton />
        ) : sortedPosts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#718096" }}>ไม่พบโพสต์</p>
        ) : (
          sortedPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default PostList;