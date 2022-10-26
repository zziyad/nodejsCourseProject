({
  async getEntity(name) {
    const entity = await schema.entity[name];
    if (entity) return entity;
    throw new Error(`Schema ${ name } is not found`);
  },
})