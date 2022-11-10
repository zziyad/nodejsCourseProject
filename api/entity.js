({
  async getEntity(name) {
    const entity = await schema.entity[name];
    // console.log({ title:  typeof 7 === entity.Title.type });
    if (entity) return entity;
    throw new Error(`Schema ${name} is not found`);
  },
});
