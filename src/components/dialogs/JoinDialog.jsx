import React from 'react';
import axios from 'axios';

import DialogBox from '../general/DialogBox';
import InputField from '../general/InputField';
import Button from '../general/Button';
import ErrorBox from '../general/ErrorBox';
import DateSelect from '../general/DateSelect';

import * as util from '../../scripts/util';
import server from '../../assets/server.json';
import { Icon } from '@iconify/react';

class JoinDialog extends React.Component {

    initState = {
        password: '',
        errors: ['username', 'email', 'password', 'passwordRepeat'],
        apiError: null,
        loading: false,
        data: {
            username: '',
            email: '',
            password: '',
            birthYear: null,
            birthMonth: null,
            birthDay: null,
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
        axios.post(`${server.domain}/user/signUp`, {
            username: this.state.data.username,
            email: this.state.data.email,
            password: this.state.data.password,
            birthyear: this.state.data.birthYear,
            birthmonth: this.state.data.birthMonth,
            birthday: this.state.data.birthDay
        }).then(res => {
            this.props.parent.setState({ joinDialogOpen: false });
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
            <DialogBox propBased visible={this.props.parent.state.joinDialogOpen} title="Создать РСС Аккаунт" onClose={(self) => {
                self.setState({closing: true});
                this.setState(this.initState);
                setTimeout(() => {
                    this.props.parent.setState({ joinDialogOpen: false });
                    self.setState({closing: false});
                }, 250);
            }}>
                <p>Присоединяйтесь к сотням Скретчеров уже сейчас, создав аккаунт!</p>

                <div className="hor">
                <InputField label="Имя Пользователя" icon="uil:user" onChange={(value, self) => {
                    let error = !util.validateUsername(value);
                    self.setState({error: value && error ? 'Неверное Имя Пользователя' : null});

                    this.addError(error, 'username');
                    this.updateData('username', value);
                }} />
                <InputField type="email" label="Адрес Почты" icon="uil:at" onChange={(value, self) => {
                    let error = !util.validateEmail(value);
                    self.setState({error: value && error ? 'Неверный Адрес Почты' : null});

                    this.addError(error, 'email');
                    this.updateData('email', value);
                }} />
                </div>

                <InputField type="password" label="Пароль" icon="uil:lock-open-alt" onChange={(value, self) => {
                    let error = !util.validatePassword(value);
                    self.setState({
                        error: value && error ? 'Неверный Пароль' : null,
                    });
                    this.updateData('password', value);

                    this.addError(error, 'password');
                }} />
                <InputField type="password" label="Повторите Пароль" reactTo={this.state.data.password} icon="uil:lock-open-alt" onChange={(value, self) => {
                    let error = value != this.state.data.password;
                    self.setState({error: value && error ? 'Пароли не совпадают' : null});

                    this.addError(error, 'passwordRepeat');
                }} />

                <div class="input-label"> <Icon icon="uil:calendar-alt" />  Дата Рождения</div>
                <div className="hor">
                    <DateSelect label="День" onChange={(value) => {
                        this.updateData('birthDay', value);
                    }} />
                    <DateSelect label="Месяц" month onChange={(value) => {
                        this.updateData('birthMonth', value);
                    }} />
                    <DateSelect label="Год" year onChange={(value) => {
                        this.updateData('birthYear', value);
                    }} />
                </div>

                <Button 
                    text="Создать Аккаунт" disabled={this.state.errors.length} 
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

export default JoinDialog;