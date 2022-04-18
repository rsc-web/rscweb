import React from 'react';
import axios from 'axios';

import DialogBox from '../general/DialogBox';
import InputField from '../general/InputField';
import Button from '../general/Button';
import ErrorBox from '../general/ErrorBox';

import * as util from '../../scripts/util';
import server from '../../assets/server.json';

class SigninDialog extends React.Component {

    initState = {
        password: '',
        errors: ['username', 'password'],
        apiError: null,
        loading: false,
        mode: 'username',
        data: {
            username: '',
            email: '',
            password: ''
        }
    }

    state = this.initState;

    addError(error, name) {
        if(!error) {
            this.setState({ errors: this.state.errors.filter(e => e !== name) });
        } else {
            if(!this.state.errors.includes(name)) this.setState({ errors: [...this.state.errors, name] });
        }
    }

    updateData(key, value) {
        this.setState({ data: { ...this.state.data, [key]: value } });
    }

    sendRequest () {
        axios.post(`${server.domain}/user/signIn`, {
            username: this.state.mode == 'username' ? this.state.data.username : null,
            email: this.state.mode == 'email' ? this.state.data.email : null,
            password: this.state.data.password
        }).then(res => {
            this.props.parent.setState({ signinDialogOpen: false });
            util.saveAuthToken(res.data.authToken);
            window.location.reload();
        }).catch(err => {
            this.setState({ apiError: err.response.data });
        }).finally(() => {
            this.setState({ loading: false });
        });
    }

    render () {
        return (
            <DialogBox propBased visible={this.props.parent.state.signinDialogOpen} title="Войти" onClose={(self) => {
                self.setState({closing: true});
                this.setState(this.initState);
                setTimeout(() => {
                    this.props.parent.setState({ signinDialogOpen: false });
                    self.setState({closing: false});
                }, 250);
            }}>
                <p>Войдите в уже существующий аккаунт, используя имя пользователя или адрес почты.</p>

               
                <select onChange={(e) => {
                    setTimeout(() => {
                        let mode = e.target.value;
                        let otherMode = mode == 'username' ? 'email' : 'username';
                        this.setState({ mode: mode });
                        this.addError(null, otherMode);
                    }, 0);
                }}>
                    <option value="username">Войти с помощью имени пользователя</option>
                    <option value="email">Войти с помощью почты</option>
                </select>

                <div className="hor">
                    <InputField 
                        label="Имя Пользователя" icon="uil:user" 
                        style={{display: this.state.mode == 'username' ? 'block' : 'none'}}
                        onChange={(value, self) => {
                            let error = !util.validateUsername(value) || this.state.mode != 'username';
                            self.setState({error: value && error ? 'Неверное Имя Пользователя' : null});

                            this.addError(error, 'username');
                            this.updateData('username', value);
                        }} 
                    />

                    <InputField 
                        type="email" label="Адрес Почты" icon="uil:at" 
                        style={{display: this.state.mode == 'email' ? 'block' : 'none'}}
                        onChange={(value, self) => {
                            let error = !util.validateEmail(value) || this.state.mode != 'email';
                            self.setState({error: value && error ? 'Неверный Адрес Почты' : null});

                            this.addError(error, 'email');
                            this.updateData('email', value);
                        }} 
                    />
                
                    <InputField type="password" label="Пароль" icon="uil:lock-open-alt" onChange={(value, self) => {
                        let error = !util.validatePassword(value);
                        self.setState({
                            error: value && error ? 'Неверный Пароль' : null,
                        });
                        this.updateData('password', value);

                        this.addError(error, 'password');
                    }} />
                </div>
                
                <Button 
                    text="Войти" disabled={this.state.errors.length} 
                    loading={this.state.loading} 
                    onClick={() => {
                        this.sendRequest();
                        this.setState({ loading: true, apiError: null });
                    }}
                />
                { this.state.apiError ? <ErrorBox text={this.state.apiError} /> : null }

            </DialogBox>
        );
    }

}

export default SigninDialog;