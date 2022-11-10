const values = new Map();

({
  async set({ key, val }) {
    console.debug({ set: { key, val } });
    return values.set(key, val);
  },

  async get({ key }) {
    const res = values.get(key);
    console.debug({ get: key, return: res });
    return res;
  },
});
