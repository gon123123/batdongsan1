import React from 'react';
import 'boxicons';
// import footer from '../../asset/image/footer2.jpg';
import logo from '../../asset/image/logoFooterDark.png';
import '../../css/footer.css';
function Footer() {
    return (
        <div className="footer">
            <img src={logo} alt="" className="footer_logo" />
            <div className="footer_detail">
                <p><span className="header_logo-lg">SKY</span><span className="header_logo-md">.HOUSE</span> </p>
                <div className="footerInfo">
                    <div className="footerInfo_item">
                        <box-icon type='solid' name='map' color="#FFFFFF"></box-icon>
                        <p>470 trần đại nghĩa quận ngũ hành sơn</p>
                    </div>
                    <div className="footerInfo_item">
                        <box-icon name='gmail' type='logo' color="#FFFFFF"></box-icon>
                        <p>bmtuan.20it1@vku.udn.vnvn</p>
                    </div>
                    <div className="footerInfo_item">
                        <box-icon name='phone-call' type='solid' color="#FFFFFF"></box-icon>
                        <p>0999088777</p>
                    </div>
                    <div className="footerInfo_item">
                        <box-icon name='time-five' color="#FFFFFF"></box-icon>
                        <p>Mon-sa: 7:00 - 22:00 Sun: 9:00 - 1616:00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer