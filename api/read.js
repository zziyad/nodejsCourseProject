({
  async readFile(id) {
    const fileName = `/data/${parseInt(id)}.json`;
    const filePath = node.process.cwd() + fileName;
    const data = await node.fs.promises.readFile(filePath, "utf8");
    // console.log({ data: JSON.parse(data) });
    return JSON.parse(data);
  },
});
