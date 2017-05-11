import React,{Component} from 'react';
import ReactDOM from 'react-dom'
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
	constructor(props){
		super(props);
		this.Constant = {
			centerPos:{
				left:0,
				right:0
			},
			hPosRange:{//水平方向的取值范围
				leftSecX:[0,0],//左侧区域X取值范围
				rightSecX:[0,0],//右侧区域X取值范围
				y:[0,0]//y取值范围
			},
			vPosRange:{//垂直方向的取值范围
				x:[0,0],//顶部 x 取值范围
				topY:[0,0]//顶部 y 取值范围
			}
		};
		this.state = {imagesArrangeArr:[{
			
		}]};
	}
	componentDidMount(){
		let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);

		let imageFigureDOM = ReactDOM.findDOMNode(this.refs.imageFigure0),
			imageFigureW = imageFigureDOM.scrollWidth,
			imageFigureH = imageFigureDOM.scrollHeight,
			halfImageFigureW = Math.ceil(imageFigureW / 2),
			halfImageFigureH = Math.ceil(imageFigureH / 2);

		//中心图片位置
		this.Constant.centerPos = {
			left:halfStageW - halfImageFigureW,
			top:halfStageH - halfImageFigureH
		}
		//左右两边取值范围
		this.Constant.hPosRange = {
			leftSecX : [-halfImageFigureW,halfStageW - 3 * halfImageFigureW],
			rightSecX : [halfStageW + halfImageFigureW,stageW - halfImageFigureW],
			y : [-halfImageFigureH,stageH - halfImageFigureH]
		}
		//顶部区域取值范围
		this.Constant.vPosRange = {
			topY:[-halfImageFigureH,halfStageH - halfImageFigureH * 3],
			x:[halfStageW - imageFigureW,halfStageW]

		}
		// console.log(stageDOM.clientWidth);
		// console.log(stageW,stageH,stageDOM);

		this.rearrahge(0);

	}
	/*
	 * 获取区间内的随机值
	 */
	getRangeRandom(low,high){
		return Math.ceil(Math.random() * (high - low) + low);
	}
	/*
	 * 重排图片
	 */
	rearrahge(centerIndex){
		let imagesArrangeArr = this.state.imagesArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imagesArrangeTopArr = [],
			topImageNum = Math.ceil(Math.random() * 2),//0-1
			topImageSpliceIndex = 0,

			imagesArrangeCenterArr = imagesArrangeArr.splice(centerIndex,1);


		
		//居中图片
		imagesArrangeCenterArr[0].pos = centerPos;

		//上方图片
		topImageSpliceIndex = Math.ceil(Math.random() * imagesArrangeArr.length - topImageNum);//上方图片起始索引
		imagesArrangeTopArr = imagesArrangeArr.splice(topImageSpliceIndex,topImageNum);
		imagesArrangeTopArr.forEach((value,index)=>{
			value.pos = {
				top:this.getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
				left:this.getRangeRandom(vPosRangeX[0],vPosRangeX[1])
			}
		})
		//左右两侧
		for(let i = 0, j = imagesArrangeArr.length, k = j / 2; i < j; i++){
			let hPosRangeLOrX = null;

			if (i < k) {
				hPosRangeLOrX = hPosRangeLeftSecX;
			}else{
				hPosRangeLOrX = hPosRangeRightSecX;
			}
			imagesArrangeArr[i].pos = {
				top : this.getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
				left : this.getRangeRandom(hPosRangeLOrX[0],hPosRangeLOrX[1])
			};
		}
		if(imagesArrangeTopArr && imagesArrangeTopArr[0]){
			imagesArrangeArr.splice(topImageSpliceIndex,0,imagesArrangeTopArr[0]);
		}
		imagesArrangeArr.splice(centerIndex,0,imagesArrangeCenterArr[0]);
		this.setState({
			imagesArrangeArr : imagesArrangeArr
		});
	}
	render(){
		let controllerUnits = [],
			imageFigures = [];

		for (let i = 0,count = imageDatas.length; i < count; i++) {
			if (!this.state.imagesArrangeArr[i]) {
				this.state.imagesArrangeArr[i] = {
					pos:{
						left:0,
						top:0
					}
				}
			};
			imageFigures.push(
				<ImageFigure key = {i} 
							data = {imageDatas[i]} 
							ref = {"imageFigure" + i} 
							arrange = {this.state.imagesArrangeArr[i]}/>
				);
		};
		
		return (
			<seciton className = "stage" ref = "stage">
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