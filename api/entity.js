
({
  async getEntity(name) {
    // schema.load('../schema');
    const entity = schema.get(name);
    console.log({ entity });
    if (entity) return entity;
    throw new Error(`Schema ${ name } is not found`);
  },
})