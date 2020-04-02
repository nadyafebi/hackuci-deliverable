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
                disabled={this.props.disabled}
                className={['button', this.props.className].join(' ')}
            >
                {this.props.text}
            </button>
        );
    }
}
