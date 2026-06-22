async function check() {
  try {
    const res = await fetch('http://localhost:5000/api/articles');
    const data = await res.json();
    console.log("Articles:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error fetching:", err.message);
  }
}
check();
