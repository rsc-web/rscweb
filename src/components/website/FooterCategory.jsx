import React from 'react';

class FooterCategory extends React.Component {

    render() {
        let className = 'footer-category';
        if(this.props.hideMobile) className += ' hidemobile';

        return (
            <div className={className}>
            <div className="footer-category-title">{this.props.title}</div>
            <div className="footer-category-links">
                {this.props.items.map((item, index) => {
                    return (
                        <a href={item.link} key={index}>{item.text}</a>
                    );
                })}
            </div>
            </div>
        );
    }
  
}

export default FooterCategory;