const mainPage = async () => {
  const articles = await window.api.posts.getAll();
  console.log(articles);
  articles.map((article) => {
    console.log(article.title);
    return ` <div class="card mt-4">
        <div class="card-body">
          <h4 class="card-title">${article.title}</h4>
          <div class="card-subtitle text-muted mb-2">${article.createdAt}</div>
          <div class="card-text mb-2 spoler">${article.description}</div>
          <a href="articles/${article.articleId}" class="btn btn-primary">Read More</a>
        </div>
      </div>
    `;
  });
};

export default mainPage;
