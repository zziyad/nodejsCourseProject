({
  async new() {
    // console.log({ art: articles[0] });
    npm.ejs.delimiter = "%";
    const form = npm.ejs.render(
      `
      <div class="container">
        <h1 class="mb-4">New Article</h1>
    
        <form action="/articles" method="POST">

        <div class="form-group">
          <label for="title">Title</label>
          <input required value="<%= article.title %>" type="text" name="title" id="title" class="form-control">
          </div>
          
          <div class="form-group">
          <label for="description">Description</label>
          <textarea name="description" id="description" class="form-control spoler"><%= article.description %></textarea>
          </div>
          
          <div class="form-group">
          <label for="markdown">Markdown</label>
          <textarea required name="markdown" id="markdown" class="form-control"><%= article.markdown %></textarea>
        </div>
      
        <a href="/" class="btn btn-secondary">Cancel</a>
        <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
   
    `,
      { article: {} }
    );

    // console.log(article);
    return { data: form };
  },

  async index() {
    try {
      const article = await sql.select("Article", ["*"]);
      npm.ejs.delimiter = "%";
      const form = npm.ejs.render(
        `
      <style>
      .spoler {
        overflow: hidden;
        white-space: nowrap;
      }
      </style>
      <div class="container">
      <h1 class="mb-4">Blog Articles</h1>
      <a href="/articles/new" class="btn btn-success">New Article</a>
  
      <% articles.forEach(article => { %>
        <div class="card mt-4">
          <div class="card-body">
            <h4 class="card-title"><%= article.title %></h4>
            <div class="card-subtitle text-muted mb-2">
              <%= article.createdAt %>
            </div>
            <div class="card-text mb-2 spoler"><%= article.description %></div>
            <a href="articles/<%= article.articleId %>" class="btn btn-primary">Read More</a>
            <a href="articles/<%= article.articleId %>" class="btn btn-primary">Edit</a>
          </div>
        </div>
      <% }) %>
    </div>
     
      `,
        { articles: article }
      );

      return { data: form };
    } catch (error) {
      console.log({ error });
      return { data: "<h1>Error 500: server error</h1>" };
    }
  },

  async getArticle(id) {
    console.log({ id });

    try {
      const article = await sql.select("Article", ["*"], { articleId: id[0] });
      // console.log({ article });

      const form = npm.ejs.render(
        `
      <div class="container">
      <h1 class="mb-4"><%= article.title %></h1>
  
        <div class="card mt-4">
          <div class="card-body">
            <div class="card-subtitle text-muted mb-2">
              <%= article.date %>
            </div>
            <div class="card-text mb-2"><%= article.description %></div>
            <a href="/articles" class="btn btn-secondary">All Articles</a>
          </div>
          </div>
      </div>
      
      `,
        { article: article[0] }
      );

      return { data: form };
    } catch (error) {
      console.log(`Not found Articlee by id ${id}`);
      return { data: `<h1> Error 404: Not found Articlee by id ${id}</h1>` };
    }
  },
  async edit(id) {
    console.log({ id });

    const article = await sql.select("Article", ["*"], { articleId: id[0] });
    // console.log({ article });

    const form = npm.ejs.render(
      `
      <div class="container">
    
        <form action="/articles" method="POST">

        <div class="form-group">
          <label for="title">Title</label>
          <input required value="<%= article.title %>" type="text" name="title" id="title" class="form-control">
          </div>
          
          <div class="form-group">
          <label for="description">Description</label>
          <textarea name="description" id="description" class="form-control spoler"><%= article.description %></textarea>
          </div>
          
          <div class="form-group">
          <label for="markdown">Markdown</label>
          <textarea required name="markdown" id="markdown" class="form-control"><%= article.markdown %></textarea>
        </div>
      
        <a href="/" class="btn btn-secondary">Cancel</a>
        <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
   
    `,
      { article: article[0] }
    );
  }
});
