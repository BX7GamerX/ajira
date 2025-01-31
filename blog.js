//blog.js
document.addEventListener("DOMContentLoaded", async () => {
    const blogContainer = document.getElementById("blog-container");

    const posts = ["post1.md", "post2.md"]; // Markdown files stored in /blogs/
    for (const post of posts) {
        const response = await fetch(`blogs/${post}`);
        const text = await response.text();

        let article = document.createElement("article");
        article.innerHTML = marked.parse(text);
        blogContainer.appendChild(article);
    }
});
