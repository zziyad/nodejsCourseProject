({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
  },
  markdown: {
    type: "string",
    required: true,
  },
  createdAt: {
    type: "date",
    now: new Date().toISOString().split("T")[0],
  },
  slug: {
    type: "string",
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: "string",
    required: true,
  },
});
