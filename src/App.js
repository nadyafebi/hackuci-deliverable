import React from 'react';
import { toast } from 'react-toastify';
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

        toast.configure({
            autoClose: 3000,
            hideProgressBar: true,
            toastClassName: 'toast'
        });
    }

    submit = async (form) => {
        const url = 'https://hack-uci-test-endpoint.herokuapp.com';
        const { name, email, funfact } = form;
        const res = await fetch(`${url}/test?name=${name}&email=${email}&funfact=${funfact}`);
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
