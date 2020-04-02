import React from 'react';
import './Button.scss';

export default class Button extends React.Component {

    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        return (
            <button 
                onClick={this.handleClick} 
                className={this.props.className}
            >
                {this.props.text}
            </button>
        );
    }
}
