import React,{Component} from 'react';
import ReactDOM from 'react-dom'

class ControllerUnit extends Component{
	handleClick(e){
		e.preventDefault();
		e.stopPropagation();
		let arrange = this.props.arrange;
		if (arrange.isCenter) {
			this.props.inverse();
		}else{
			this.props.center();
		}

	}
	render(){
		let className = "controller-unit";
		let arrange = this.props.arrange;

		if (arrange.isCenter) {
			className += " is-center";
			if (arrange.isInverse) {
				className += " is-inverse";
			}
		}

		return (
				<span className={className} onClick={this.handleClick.bind(this)}></span>
			);
	}
}

export default ControllerUnit;