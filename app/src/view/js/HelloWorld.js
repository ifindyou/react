var React=require('../../vendor/react');
var HelloWorld=React.createClass({displayName: "HelloWorld",
	render:function(){
		return React.createElement("div", null, 
					"Hello ", this.props.name
			   )
	}
});
function render(name){
	React.render(
		React.createElement(HelloWorld, {name: name}),
		document.body
	);
}
exports.render=render;
//# sourceMappingURL=HelloWorld.js.map