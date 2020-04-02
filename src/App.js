import React from 'react';
import { toast } from 'react-toastify';
import Form from './components/Form';
import './App.scss';

export default class App extends React.Component {
    formSchema = [
        {
            name: 'name',
            label: 'Name',
            required: true
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            validFn: (value) => {
                const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                return {
                    valid: pattern.test(value),
                    message: 'Invalid email.'
                };
            }
        },
        {
            name: 'funfact',
            label: 'Fun Fact',
            multi: true,
            required: true
        }
    ];

    constructor(props) {
        super(props);

        this.form = React.createRef();

        toast.configure({
            autoClose: 3000,
            hideProgressBar: true,
            toastClassName: 'toast'
        });
    }

    submit = async (values) => {
        this.form.current.setActive(false);

        const url = 'https://hack-uci-test-endpoint.herokuapp.com/test';
        const params = new URLSearchParams();
        for (const field in values) {
            params.append(field, values[field]);
        }
        const res = await fetch(`${url}?${params}`);

        this.form.current.setActive(true);

        if (res.ok) {
            this.form.current.clear();
            toast.success('Success. Thank you for applying!');
        } else {
            const text = await res.text();
            if (text.includes('email')) {
                toast.error('Invalid email address!');
            } else if (text.includes('parameter')) {
                toast.error('Please fill out all the form fields!');
            } else {
                toast.error('Something is wrong! Please try again.');
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
