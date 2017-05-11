import React,{Component} from 'react';

import ImageFigure from './imageFigure'
import images from '../data/imageDatas';


import '../css/grllery.scss';

let imageDatas =  (function genImageURL(imageDataArr){
	for (let i = 0, count = imageDataArr.length; i < count; i++){
		let imageData = imageDataArr[i];
		
		imageData.imageURL =  require("../images/" + imageData.fileName);
		imageDataArr[i] = imageData;
	}
	return imageDataArr;
})(images);

class Gallery extends Component{
	render(){
		let controllerUnits = [],
			imageFigures = [];

		for (let i = 0,count = imageDatas.length; i < count; i++) {
			imageFigures.push(<ImageFigure key = {i} data = {imageDatas[i]} />);
		};
		
		return (
			<seciton className = "stage">
				<seciton className = "img-sec">
					{imageFigures}
				</seciton>
				<nav className = "controller-nav">
					{controllerUnits}
				</nav>
			</seciton>
			);
	}
}

export default Gallery