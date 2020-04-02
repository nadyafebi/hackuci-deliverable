import React from 'react';
import Input from './Input';
import Button from './Button';
import './Form.scss';

export default class Form extends React.Component {
    
    constructor(props) {
        super(props);

        if (!props.schema) {
            props.schema = [];
        }

        this.state = {};
        for (const field of props.schema) {
            this.state[field.field] = '';
        }
    }

    onInputChange = (field, value) => {
        this.setState({ [field]: value })
    }

    submit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state);
        }
    }

    clear = () => {
        const newState = {};
        for (const field of this.props.schema) {
            newState[field.field] = '';
        }
        this.setState(newState);
    }

    render() {
        return (
            <div className={["card", this.props.className].join(' ')}>
                <h2 className="title">{this.props.title}</h2>

                {
                    this.props.schema.map(field => (
                        <Input
                            key={field.field}
                            value={this.state[field.field]}
                            onChange={this.onInputChange}
                            field={field.field}
                            label={field.label}
                            type={field.type}
                            multi={field.multi}
                            className="input" 
                        />
                    ))
                }

                <Button onClick={this.submit} text="Submit" className="submit-button" />
            </div>
        );
    }
}
