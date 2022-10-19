({
  async upd(id, instance) {
  const fileName = `./data/${parseInt(id)}.json`;
  const data = JSON.stringify(instance);
  await fs.promises.writeFile(fileName, data);
  return true;
  }
})