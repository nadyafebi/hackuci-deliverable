import React from 'react';
import Form from './components/Form';
import './App.scss';

export default class App extends React.Component {
    formSchema = [
        {
        field: 'name',
        label: 'Name'
        },
        {
        field: 'email',
        label: 'Email',
        type: 'email'
        },
        {
        field: 'funfact',
        label: 'Fun Fact',
        multi: true
        }
    ];

    constructor(props) {
        super(props);
        this.form = React.createRef();
    }

    submit = async (form) => {
        const url = 'https://hack-uci-test-endpoint.herokuapp.com';
        const { name, email, funfact } = form;
        const res = await fetch(`${url}/test?name=${name}&email=${email}&funfact=${funfact}`);
        if (res.ok) {
            alert('Success! Thank you for applying.');
            this.form.current.clear();
        } else {
            const text = await res.text();
            if (text.includes('email')) {
                alert('Invalid email address!');
            } else {
                alert('Something is wrong! Please try again.')
            }
        }
    }

    render() {
        return (
            <div className="app">
                <div>
                    <Form
                        ref={this.form}
                        title="Hack UCI Application"
                        schema={this.formSchema} 
                        onSubmit={this.submit}
                        className="form"
                    />
                </div>
                <div>
                    <img src="/petr.png" alt="petr" className="petr" />
                </div>
            </div>
        );
    }
}
