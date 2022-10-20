({
  async getEntity(name) {
    const entity = schema[name];
    if (entity) return entity;
    throw new Error(`Schema ${ name } is not found`);
  },
})