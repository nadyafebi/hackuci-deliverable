import React from 'react';
import './Input.scss';

export default class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    handleChange = (event) => {
        if (this.props.onChange) {
            this.props.onChange(event.target.name, event.target.value);
            this.setValidity(true);
        }
        this.checkValidity();
    }

    handleFocusLost = () => {
        // If required, check if user input value.
        if (this.props.required && !this.props.value) {
            this.setValidity(false, 'Please fill out this field.');
            return;
        }
        this.checkValidity();
    }

    checkValidity = () => {
        if (this.props.validFn) {
            const { valid, message } = this.props.validFn(this.props.value);
            this.setValidity(valid, message);
        }
    }

    setValidity = (valid, message) => {
        if (this.props.onValidityChange) {
            this.props.onValidityChange(this.props.name, valid);
        }
        this.setState({ error: valid ? null : message });
    }

    render() {
        const error = this.props.error || this.state.error;

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
                        onBlur={this.handleFocusLost}
                        disabled={this.props.disabled}
                        placeholder={this.props.label} 
                        required={this.props.required}
                    />
                    :
                    <input
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.handleChange}
                        onBlur={this.handleFocusLost}
                        disabled={this.props.disabled}
                        placeholder={this.props.label}
                        type={this.props.type || 'text'}
                        required={this.props.required}
                    />
                }
                <small className="error">{ error || '\u00A0'}</small>
            </div>
        );
    }
}
