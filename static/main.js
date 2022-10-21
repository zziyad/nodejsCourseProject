
const createPosts = async (entity, id) => {
  const schema = await window.api.entity.getEntity(entity);
  const instance = await window.api.read.readFile(id);
  console.log(schema);
  const block = document.createElement('div');
  block.setAttribute('class', 'block__row');
  const inputs = {};
  for (const field in schema) {
    const definition = schema[field]
    const input = document.createElement('div');
    input.setAttribute('class', field);
    const blockContent = document.createElement('div');
    blockContent.setAttribute('class', 'block__content');
    const outPut = document.createElement(definition.control);
    console.log({ definition });
    if (definition.control === 'button') {
      outPut.onclick = () => console.log('Hello from button');
    }
    outPut.innerHTML = instance[field];
    blockContent.appendChild(outPut)
    input.appendChild(blockContent);
    block.appendChild(input);
  }
  // const button = document.createElement('button');
  // button.innerHTML = 'Save';
  // block.appendChild(button);
  document.body.appendChild(block);


}
createPosts('post', 3000);