import React from 'react';
import Input from './Input';
import Button from './Button';
import './Form.scss';

export default class Form extends React.Component {
    render() {
        return (
            <div className={["card", this.props.className].join(' ')}>
                <h2 className="title">Hack UCI Application</h2>
                <Input name="Name" className="input" />
                <Input name="Email" className="input" type="email" />
                <Input name="Fun Fact" multi={true} className="input" />
                <Button text="Submit" className="submit-button" />
            </div>
        );
    }
}
