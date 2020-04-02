import React from 'react';
import Input from './Input';
import Button from './Button';
import './Form.scss';

export default class Form extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            values: {},
            valid: {}
        };

        for (const field of props.schema) {
            this.state.values[field.name] = '';
            this.state.valid[field.name] = !field.required;
        }
    }

    onInputChange = (name, value) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: value
            }
        }));
    }

    onValidityChange = (name, valid) => {
        this.setState(prevState => ({
            valid: {
                ...prevState.valid,
                [name]: valid
            }
        }));
    }

    submit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.values);
        }
    }

    clear = () => {
        const newState = { disabled: false };
        for (const field of this.props.schema) {
            newState[field.field] = '';
        }
        this.setState(newState);
    }

    setActive = (enable) => {
        this.setState({ disabled: !enable });
    }

    render() {
        // Check if the fields are valid.
        let submittable = true;
        for (const field in this.state.valid) {
            if (!this.state.valid[field]) {
                submittable = false;
                break;
            }
        }

        return (
            <div className={["card", this.props.className].join(' ')}>
                <h2 className="title">{this.props.title}</h2>

                {
                    this.props.schema.map(field => (
                        <Input
                            key={field.name}
                            name={field.name}
                            value={this.state.values[field.name]}
                            onChange={this.onInputChange}
                            onValidityChange={this.onValidityChange}
                            disabled={this.state.disabled}
                            label={field.label}
                            type={field.type}
                            multi={field.multi}
                            required={field.required}
                            validFn={field.validFn}
                            className="input" 
                        />
                    ))
                }

                <Button
                    onClick={this.submit} 
                    disabled={this.state.disabled || !submittable}
                    text="Submit"
                    className="submit-button"
                />
            </div>
        );
    }
}
