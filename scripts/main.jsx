var React = require("react");
var ReactDOM = require("react-dom");

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        build7

      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(CommentBox, null),
  document.getElementById("example")
);