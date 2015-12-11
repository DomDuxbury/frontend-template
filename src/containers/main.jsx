var React = require("react");
var ReactDOM = require("react-dom");
var ExampleComponent = require("../components/exampleComponent.jsx");

class Root extends React.Component {
  render() {
    return (
      <div>
        <ExampleComponent />
      </div>
    );
  }
}

let rootElement = document.getElementById("root");
ReactDOM.render(React.createElement(Root, null), rootElement);