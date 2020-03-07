const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === 'function') {
      return tag(props);
    }

    const element = { tag, props: { ...props, children } };
    return element;
  }
};

const render = (reactElement, container) => {
  if (['string', 'number'].includes(typeof reactElement)) {
    container.appendChild(document.createTextNode(String(reactElement)));
    return;
  }

  const actualDomElement = document.createElement(reactElement.tag);

  if (reactElement.props) {
    Object.keys(reactElement.props)
      .filter(p => p !== 'children')
      .forEach(p => (actualDomElement[p] = reactElement.props[p]));
  }

  if (reactElement.props.children) {
    reactElement.props.children.forEach(child =>
      render(child, actualDomElement)
    );
  }

  container.appendChild(actualDomElement);
};

const states = [];
let stateCursor = 0;

const useState = initialState => {
  const currentCursor = stateCursor;
  states[currentCursor] = states[currentCursor] || initialState;

  const setState = newState => {
    states[currentCursor] = newState;
    reRender();
  };

  stateCursor++;

  return [states[currentCursor], setState];
};

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div id="container">
      <h1>Hello world!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum itaque,
        totam, nam in laboriosam cumque veritatis velit corrupti quaerat, ipsa
        amet. Nulla, laborum cum! Libero dolores explicabo maiores neque
        officiis.
      </p>
      <br />
      <hr />
      <br />
      <h1>Count: {count}</h1>
      <button onclick={() => setCount(count + 1)}>plus</button>
      <button onclick={() => setCount(count - 1)}>minus</button>
    </div>
  );
};

render(<App />, document.getElementById('root'));

function reRender() {
  stateCursor = 0;
  document.getElementById('root').firstChild.remove();
  render(<App />, document.getElementById('root'));
}
