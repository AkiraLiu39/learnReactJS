import React,{Component} from "react";

class ImageFigure extends Component{
	handleClick(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}
		
		e.stopPropagation();
		e.preventDefault();

	}
	
	render(){
		let data = this.props.data;
		let arrange = this.props.arrange;
		let styleObj = {};
		let imgFigureClassName = "img-figure";
		imgFigureClassName += (arrange.isInverse ? " is-inverse" : "");
		if (arrange.pos) {
			styleObj = this.props.arrange.pos;
		};

		if (arrange.rotate) {
			(['Moz','ms','Webkit','']).forEach((value)=>{
				styleObj[value + 'transform'] = 'rotate(' + arrange.rotate + 'deg)';
			});
		};
		if (arrange.isCenter){
			styleObj.zIndex = 11;
		}
		return (
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
				<img src={data.imageURL} alt={data.title}/>
				<figcaption>
					<h2 className = "img-title">{data.title}</h2>
					<div className = 'image-back' onClick={this.handleClick.bind(this)}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figcaption>
			</figure>
			);
	}
}

export default ImageFigure;