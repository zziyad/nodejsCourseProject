({
  async say() {
    // const sqlTest = await sql;
    const schemas = await schema;

    console.log({ schema });

    // const res = await sql.query('SELECT * FROM "comments" WHERE "user_id" = $1', [3]);
    // console.log({ res });

    return { status: "ok" };
  },
});
