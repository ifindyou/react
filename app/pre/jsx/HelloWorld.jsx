var React=require('../../vendor/react');
var HelloWorld=React.createClass({
	render:function(){
		return <div>
					Hello {this.props.name}
			   </div>
	}
});
function render(name){
	React.render(
		<HelloWorld name={name} />,
		document.body
	);
}
exports.render=render;