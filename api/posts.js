({
  // async getAll() {
  //   const allArticles = await sql.select("Article", ['*']);
  //   return allArticles;
  // },

  // async save(data) {
  //   return db("Article").create(data);
  // }, 

  // async update(id, { login, password }) {
  //   const passwordHash = await common.hash(password);
  //   return db("Article").update(id, { login, password: passwordHash });
  // },

  // async delete(id) {
  //   return db("Article").delete(id);
  // },

  async article(data) {
    const article = {
      title: data.title,
      createdAt: new Date().toISOString().split("T")[0],
      description: data.description,
      markdown: data.markdown,
      slug: "",
      sanitizedHtml: "",
    };

    const result = await sql.insert("Article", article).returning("articleId");

    return result.rows;
  },

  // async find(mask) {
  //   const sql = 'SELECT login from Article where login like $1';
  //   return db('Article').query(sql, [mask]);
  // },
});
