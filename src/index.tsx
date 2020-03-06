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

const App = () => {
  return (
    <div id="container">
      <h1>Hello world!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum itaque,
        totam, nam in laboriosam cumque veritatis velit corrupti quaerat, ipsa
        amet. Nulla, laborum cum! Libero dolores explicabo maiores neque
        officiis.
      </p>
    </div>
  );
};

render(<App />, document.getElementById('root'));

function reRender() {
  document.getElementById('root').firstChild.remove();
  render(<App />, document.getElementById('root'));
}
