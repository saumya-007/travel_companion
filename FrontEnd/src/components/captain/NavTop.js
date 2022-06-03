import React, { useState } from 'react'

export const NavTop = () => {
    let [userName] = useState(localStorage.getItem('userName'));
    return (
        <header className="header-desktop">
            <div className="section__content section__content--p30">
                <div className="container-fluid">
                    <div className="header-wrap">
                        <div className="form-header"></div>
                        <div className="header-button">
                            <div className="account-wrap">
                                <div className="account-item clearfix js-item-menu">
                                    <div className="image">
                                        {/* <img src="/images/icon/avatar-01.jpg" alt="John Doe" /> */}
                                        <img src={`/images/` + localStorage.getItem("profilephoto")} alt="..." />
                                    </div>
                                    <div className="content">
                                        <a className="js-acc-btn" href="#">{userName}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
