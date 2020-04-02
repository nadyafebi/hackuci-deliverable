import React from 'react';
import './Input.scss';

export default class Input extends React.Component {

    handleChange = (event) => {
        if (this.props.onChange) {
            this.props.onChange(event.target.name, event.target.value);
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
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                        placeholder={this.props.label} 
                    />
                    :
                    <input
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                        placeholder={this.props.label}
                        type={this.props.type || 'text'}
                    />
                }
            </div>
        );
    }
}
