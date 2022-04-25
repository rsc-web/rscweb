import React from 'react';
import axios from 'axios';
import server from '../../assets/server.json';
import { Icon } from '@iconify/react';

class ProfileAvatarChanger extends React.Component {

    state = {
        loading: false,
        file: null,
        avatarUrl: null
    }

    input = React.createRef();

    error (t) {
        this.setState({ loading: false });
        alert(`Ошбика! ${t}`);
    }

    handleChange (target) {
        if(target.files.length < 1) this.error('Не выбран файл');
        else if(!target.files[0].type.startsWith('image/')) this.error('Это не изображение');
        else if(target.files[0].size > 3145728) this.error('Размер файла должен быть не более 3 Мб');
        else {
            this.setState({ file: target.files[0] });
            setTimeout(() => {
                this.uploadImage();
            }, 0);
        }
    }

    uploadImage () {
        let formdata = new FormData();
        formdata.append('authToken', localStorage.getItem('authToken'));
        formdata.append('avatar', this.state.file);
        this.setState({ loading: true });

        axios({
            method: "post",
            url: `${server.domain}/user/editAvatar`,
            data: formdata,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            this.setState({ loading: false, avatarUrl: res.data.avatarUrl });
            this.input.current.value = null;
        }).catch(err => {
            this.setState({ loading: false });
            this.error(err.response.data);
        });
    }

    render () {
        return (
            <div className="profile-avatar-changer" onClick={() => {
               this.input.current.click();
            }}>
                <input type="file" accept="image/*" onChange={() => { this.handleChange(this.input.current) }} ref={this.input} />
                {this.state.avatarUrl ? <img src={this.state.avatarUrl} alt="New Avatar" /> : null}
                <Icon icon="uil:pen" />
            </div>
        );
    }

}

export default ProfileAvatarChanger;