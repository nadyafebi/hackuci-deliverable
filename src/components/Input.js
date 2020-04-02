import React from 'react';
import './Input.scss';

export default class Input extends React.Component {
    render() {
        return (
            <div className={["container", this.props.className].join(' ')}>
                <label>{this.props.name}</label>
                {
                    this.props.multi ?
                    <textarea placeholder={this.props.name} /> :
                    <input 
                        placeholder={this.props.name}
                        type={this.props.type || 'text'}
                    />
                }
            </div>
        );
    }
}
