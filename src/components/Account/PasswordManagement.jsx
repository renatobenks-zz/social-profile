import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class PasswordManagement extends Component {
    constructor (props) {
        super(props);
        this._onClick = this._onClick.bind(this);
    }

    _onClick (event) {
        event.preventDefault();
        this.props.onChangeContent(
            <Form>
                <h1>Changes password</h1>
                <Form.Field width="12">
                    <label>Old password</label>
                    <input placeholder="Old password"/>
                </Form.Field>
                <Form.Field width="12">
                    <label>New password</label>
                    <input placeholder="New password"/>
                </Form.Field>
                <Form.Field width="12">
                    <label>Repeat password</label>
                    <input placeholder="Repeat password"/>
                </Form.Field>
                <Form.Button primary>Change</Form.Button>
            </Form>
        );
    }

    render () {
        return (
            <li>
                <a href="#" onClick={this._onClick}>
                    Changes password
                </a>
            </li>
        );
    }
}

export default PasswordManagement
