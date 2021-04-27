import React from 'react';
import './static/AboutPage.scss';
import { Navbar, BottomArrowLink, CoffeeWithUs } from '../../components/index';

import { ReactComponent as AnimateImage } from './static/img/animate-image.svg';

export class AboutPage extends React.Component {
    render() {
        return (
            <div className="about-page">
                <Navbar />
                <BottomArrowLink
                    text="home"
                    link="/"
                    arrow="up"
                />
                <CoffeeWithUs />
                <div className="about-container">
                    <div className="images-block">
                        <div className="image">
                            <AnimateImage />
                        </div>
                    </div>
                    <div className="content-block">
                        <h2 className="title">ColorEdges</h2>
                        <h3 className="sub-title">SOFTWARE DEVELOPMENT SOLUTIONS</h3>
                        <p className="text1">Alongside world-class product portfolio, we also offer customised services for both profit and non-profit organisations. By crafting intelligent and efficient systems that tailor to the exclusive needs of wide array of our clients worldwide.</p>
                        <p className="text2">Alongside world-class product portfolio, we also offer customised services for both profit and non-profit organisations. By crafting intelligent and efficient systems that tailor to the exclusive needs of wide array of our clients worldwide.
</p>
                    </div>
                </div>
            </div>
        )
    }
}
