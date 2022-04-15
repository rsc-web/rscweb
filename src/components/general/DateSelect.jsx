import React from 'react';
import months from '../../assets/months.json';

const yearList = [];
for (let i = new Date().getFullYear(); i > new Date().getFullYear() - 100; i--) {
    yearList.push(i);
}

const dateList = [];
for (let i = 1; i <= 31; i++) {
    dateList.push(i);
}

class DateSelect extends React.Component {

    state = {
        value: this.props.value || null,
    }

    monthToNumber (month) {
        return months.full.indexOf(month) + 1;
    }


    render() {
        let items = dateList;
        if(this.props.month) items = months.full;
        if(this.props.year) items = yearList;

        return (
            <select onChange={e => {
                setTimeout(() => {
                    let val = this.props.month ? this.monthToNumber(e.target.value) : e.target.value;
                    this.setState({ value: val });
                    if(this.props.onChange) this.props.onChange(val, this);
                }, 0);
            }}>
                {items.map((item, index) => {
                    return <option key={index} name={this.props.month ? index+1 : item}>{item}</option>;
                })}
            </select>
        );
    }

}

export default DateSelect;