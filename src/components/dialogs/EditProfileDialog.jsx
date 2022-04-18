import React from 'react';
import axios from 'axios';

import DialogBox from '../general/DialogBox';
import InputField from '../general/InputField';
import Button from '../general/Button';
import ErrorBox from '../general/ErrorBox';

import * as util from '../../scripts/util';
import server from '../../assets/server.json';

class EditProfileDialog extends React.Component {

    initState = {
        errors: [],
        changed: false,
        apiError: null,
        loading: false,
        data: {
            displayName: this.props.displayName,
            description: this.props.description
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
        axios.post(`${server.domain}/user/editProfile`, {
            authToken: localStorage.getItem('authToken'),
            displayName: this.state.data.displayName,
            description: this.state.data.description
        }).then(res => {
            let newUser = this.props.parent.state.user;
            newUser.displayName = res.data.displayName || this.state.data.displayName;
            newUser.description = res.data.description || this.state.data.description;
            this.props.parent.setState({ editProfileDialogOpen: false, user: newUser });
        }).catch(err => {
            console.log(err);
            this.setState({ apiError: err.response.data });
        }).finally(() => {
            this.setState({ loading: false });
        });
    }

    render () {
        return (
            <DialogBox propBased visible={this.props.parent.state.editProfileDialogOpen} title="Редактировать Свой Профиль" onClose={(self) => {
                self.setState({closing: true});
                this.setState(this.initState);
                setTimeout(() => {
                    this.props.parent.setState({ editProfileDialogOpen: false });
                    self.setState({closing: false});
                }, 250);
            }}>

            <InputField 
                label="Видимое Имя" icon="uil:tag-alt" defaultValue={this.props.displayName}
                onChange={(value, self) => {
                    let error = value.length > 64;
                    self.setState({error: error ? 'Слишком Длинное' : null});
                    this.setState({ changed: true });

                    this.addError(error, 'displayName');
                    this.updateData('displayName', value);
                }} 
            />
            <InputField 
                label="Описание" type="textarea" icon="uil:comment-dots" defaultValue={this.props.description}
                onChange={(value, self) => {
                    let error = value.length > 1024;
                    self.setState({error: error ? 'Слишком Длинное' : null});
                    this.setState({ changed: true });

                    this.addError(error, 'description');
                    this.updateData('description', value);
                }} 
            />
                
            <Button 
                text="Изменить Данные" disabled={this.state.errors.length || !this.state.changed} 
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

export default EditProfileDialog;