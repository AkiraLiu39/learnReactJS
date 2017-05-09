import React,{Comment} from 'react';
import {render} from 'react-dom';
import images from '../data/imageDatas';

let imageDatas =  (function genImageURL(imageDataArr){
	for (let i = 0, count = imageDataArr.length; i < count; i++){
		let imageData = imageDataArr[i];
		import img from "../images/"+ imageData.fileName;
		imageData.imageURL =  img;
		imageDataArr[i] = imageData;
	}
	return imageDataArr;
})(images);