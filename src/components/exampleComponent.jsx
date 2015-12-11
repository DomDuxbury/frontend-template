var React = require("react");

var ExampleComponent = React.createClass({
  propTypes: {
    exampleProp: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="example">
        {this.props.exampleProp}
      </div>
    );
  }
});

module.exports = ExampleComponent;

