import React from 'react';
import './Input.scss';

export default class Input extends React.Component {

    handleChange = (event) => {
        if (this.props.onChange) {
            this.props.onChange(this.props.field, event.target.value);
        }
    }

    render() {
        return (
            <div className={["container", this.props.className].join(' ')}>
                <label>{this.props.label}</label>
                {
                    this.props.multi 
                    ?
                    <textarea 
                        value={this.props.value}
                        onChange={this.handleChange}
                        placeholder={this.props.label} 
                    />
                    :
                    <input
                        value={this.props.value}
                        onChange={this.handleChange}
                        placeholder={this.props.label}
                        type={this.props.type || 'text'}
                    />
                }
            </div>
        );
    }
}
