import React,{Component} from "react";

class ImageFigure extends Component{
	render(){
		let data = this.props.data;
		let styleObj = {};
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		};
		
		return (
			<figure className="img-figure" style={styleObj}>
				<img src={data.imageURL} alt={data.title}/>
				<figcaption>
					<h2 className = "img-title">{data.title}</h2>
				</figcaption>
			</figure>
			);
	}
}

export default ImageFigure;