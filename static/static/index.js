
const createPosts = async (entity, id) => {
  const schema = await window.api.entity.getEntity(entity);
  const instance = await window.api.read.readFile(id);
  const schemaLog = await window.api.talks.say()
  // console.log(schema);
  const block = document.createElement('div');
  block.setAttribute('class', 'block__row');
  const inputs = {};

  const fields = Object.assign(schema);
  // console.log(fields.type);
  // for (const field of fields) {
    // const definition = schema.`${field}`
    console.log({ fields, schemaLog });
  //   const input = document.createElement('div');
  //   input.setAttribute('class', field);
  //   const blockContent = document.createElement('div');
  //   blockContent.setAttribute('class', 'block__content');
  //   const outPut = document.createElement(definition.control);
  //   // console.log({ definition });
  //   if (definition.control === 'button') {
  //     outPut.onclick = () => console.log('Hello from button');
  //   }
  //   outPut.innerHTML = instance[field];
  //   blockContent.appendChild(outPut)
  //   input.appendChild(blockContent);
  //   block.appendChild(input);
  // }
  // const button = document.createElement('button');
  // button.innerHTML = 'Save';
  // block.appendChild(button);
  document.body.appendChild(block);


}
// createPosts('post', 3000);