async function test() {
  try {
    const loginRes = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password123' })
    });
    const { token } = await loginRes.json();

    const articlesRes = await fetch('http://localhost:5000/api/articles');
    const articles = await articlesRes.json();
    const target = articles[articles.length - 1]; // "eqqe"
    console.log("Deleting target article:", target.id);

    const deleteRes = await fetch(`http://localhost:5000/api/articles/${target.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!deleteRes.ok) {
      console.error("Delete failed:", await deleteRes.text());
    } else {
      console.log("Delete succeeded:", await deleteRes.json());
    }

  } catch (err) {
    console.error("Script error:", err);
  }
}
test();
