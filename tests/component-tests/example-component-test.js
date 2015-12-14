var ExampleComponent = require("../../src/components/exampleComponent.jsx");
var ReactTestUtils = require('react-addons-test-utils');
var ReactDOM = require('react-dom');
var React = require("react");

describe('An Example Component', function() {
  it('initialises correctly', function() {
    var testComponent = ReactTestUtils.renderIntoDocument(
      <ExampleComponent exampleProp = "Test"/>
    );
    var testComponent = ReactDOM.findDOMNode(testComponent);
    expect(testComponent.innerHTML).toEqual('Test');
  });
});