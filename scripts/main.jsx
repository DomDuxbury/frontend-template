var React = require("react");
var ReactDOM = require("react-dom");

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Dominic is so clever (heart) He is my favourite woohoo
        pretend there is a big space 

        Panda agrees
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(CommentBox, null),
  document.getElementById("example")
);