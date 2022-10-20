({
 async readFile(id) {
    const fileName = `./data/${parseInt(id)}.json`;
    const data = await fs.promises.readFile(fileName, 'utf8');
    // return JSON.parse(data);
  }
})
