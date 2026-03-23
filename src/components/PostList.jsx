import { useState, useMemo } from "react"; // เพิ่ม useMemo เข้ามา
import PostCard from "./PostCard";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // ใช้ useMemo หุ้มการ Filter และ Sort เพื่อประหยัด Memory
  const sortedPosts = useMemo(() => {
    // 1. กรองโพสต์ตาม Search
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );

    // 2. เรียงลำดับตาม ID
    return [...filtered].sort((a, b) => {
      if (sortOrder === "desc") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });
  }, [posts, search, sortOrder]); // จะคำนวณใหม่เฉพาะเมื่อ 3 ค่านี้เปลี่ยนเท่านั้น

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          style={{
            padding: "0.4rem 1rem",
            borderRadius: "6px",
            border: "1px solid #cbd5e0",
            cursor: "pointer",
            background: "white"
          }}
        >
          {sortOrder === "desc" ? "▼ ใหม่สุดก่อน" : "▲ เก่าสุดก่อน"}
        </button>
      </div>

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {sortedPosts.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;