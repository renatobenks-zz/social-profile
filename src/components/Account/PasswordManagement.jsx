import React, { Component } from 'react'
import { Form, Checkbox, Message } from 'semantic-ui-react'

class PasswordManagement extends Component {
    constructor (props) {
        super(props);
        this.state = {
            password: {
                show: false,
                active: false,
                submitted: false
            }
        };

        this.onShowPassword = this.onShowPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    onShowPassword (event) {
        event.preventDefault();
        const { password } = this.state;
        this.setState({
            password: {
                ...password,
                show: !password.show
            }
        });
    }

    _onSubmit () {
        const { password } = this.state;
        this.setState({
            password: {
                ...password,
                active: !password.active
            }
        });
    }

    onChangePassword (event) {
        event.preventDefault();
        this._onSubmit();
        setTimeout(() => {
            this._onSubmit();
            const { password } = this.state;
            this.setState({
                password: {
                    ...password,
                    submitted: true,
                    changed: true,
                    message: 'Password was changed with success!'
                }
            });
        }, 1000);
    }

    render () {
        const { password } = this.state;
        return (
            <Form onSubmit={this.onChangePassword}>
                <h1>Changes password</h1>
                <Form.Field required width="12">
                    <label>Old password</label>
                    <input
                        required
                        maxLength={8}
                        type="password"
                        placeholder="Old password"
                    />
                </Form.Field>
                <Form.Field required width="12">
                    <label>New password</label>
                    <input
                        required
                        maxLength={8}
                        type={password.show ? 'text' : 'password'}
                        placeholder="New password"
                    />
                </Form.Field>
                <Form.Field required width="12">
                    <label>Repeat password</label>
                    <input
                        required
                        maxLength={8}
                        type={password.show ? 'text' : 'password'}
                        placeholder="Repeat password"
                    />
                    <Checkbox
                        label="Mostrar senha"
                        onChange={this.onShowPassword}
                    />
                </Form.Field>
                <Message
                    icon="checkmark"
                    size="tiny"
                    header="Password changes"
                    content={password.message}
                    style={{textAlign: 'left'}}
                    error={!password.changed}
                    success={password.changed}
                    hidden={!password.submitted}
                    visible={password.submitted}
                />
                <Form.Button
                    toggle
                    primary
                    active={password.active}
                    loading={password.active}
                    >
                    Change
                </Form.Button>
            </Form>
        );
    }
}

export default PasswordManagement
