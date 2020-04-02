import React from 'react';
import Input from './Input';
import Button from './Button';
import './Form.scss';

export default class Form extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            values: {}
        };

        for (const field of props.schema) {
            this.state.values[field.name] = '';
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

    submit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state);
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
                            disabled={this.state.disabled}
                            label={field.label}
                            type={field.type}
                            multi={field.multi}
                            className="input" 
                        />
                    ))
                }

                <Button
                    onClick={this.submit} 
                    disabled={this.state.disabled}
                    text="Submit"
                    className="submit-button"
                />
            </div>
        );
    }
}
