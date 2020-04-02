import React from 'react';
import './Button.scss';

export default class Button extends React.Component {
    render() {
        return (
            <button className={this.props.className}>{this.props.text}</button>
        );
    }
}
