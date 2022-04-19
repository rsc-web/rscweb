import React from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';

import DialogBox from '../general/DialogBox';
import InputField from '../general/InputField';
import Button from '../general/Button';
import ErrorBox from '../general/ErrorBox';

import server from '../../assets/server.json';

class BanUserDialog extends React.Component {

    initState = {
        errors: [],
        apiError: null,
        loading: false,
        data: {
            reason: this.props.displayName
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
        axios.post(`${server.domain}/moderation/ban`, {
            authToken: localStorage.getItem('authToken'),
            uid: this.props.uid,
            reason: this.state.data.reason
        }).then(() => {
            window.location.reload();
        }).catch(err => {
            console.log(err);
            this.setState({ apiError: err.response.data });
        }).finally(() => {
            this.setState({ loading: false });
        });
    }

    render () {
        return (
            <DialogBox propBased visible={this.props.parent.state.banUserDialogOpen} title="Вы уверены, что хотите забанить этого участника?" onClose={(self) => {
                self.setState({closing: true});
                this.setState(this.initState);
                setTimeout(() => {
                    this.props.parent.setState({ banUserDialogOpen: false });
                    self.setState({closing: false});
                }, 250);
            }}>

            <p>
                После бана, участник не сможет смотреть контент сайта РСС, редактировать свой профиль и писать посты.
                Они будут видеть кто их забанил и по какой причинне.
            </p>

            <InputField 
                label="Причина" type="textarea"
                onChange={(value, self) => {
                    let error = value.length > 1024;
                    self.setState({error: error ? 'Слишком Длинная Причина' : null});
                    this.setState({ changed: true });

                    this.addError(error, 'reason');
                    this.updateData('reason', value);
                }} 
            />

            <div class="input-label"> <Icon icon="uil:calendar-alt" />  Дата Разбана</div>
            <p>Coming Soon</p>
                
            <Button 
                text="Забанить" disabled={this.state.errors.length} 
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

export default BanUserDialog;