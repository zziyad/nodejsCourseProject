({
  async say(message) {
    console.log({ schema });
    console.log({ message });
    return { status: 'ok' };
  },
});
