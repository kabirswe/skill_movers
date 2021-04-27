import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, BottomArrowLink, CoffeeWithUs, ServiceCard } from '../../components/index';
import { ReactComponent as MainLogo } from './static/img/home-logo.svg';
import './static/HomePage.scss';

export class HomePage extends React.Component {
    render() {
        return (
            <div className="home-page">
                <Navbar />
                <BottomArrowLink
                    text="about"
                    link="/about"
                    arrow="down"
                />
                <CoffeeWithUs />
                <div className="home-container">
                    <div className="logo-block">
                        <MainLogo />
                        <p>Breat<br/>in Color</p>
                    </div>
                    <div className="link-block">
                        <ul>
                            <li>
                                <Link to="/about">
                                    <span>Theme Development</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">
                                    <span>UX UI</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">
                                    <span>Web Application Development</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">
                                    <span>Mobile Application</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="services-container">
                    <div className="services">
                        <ServiceCard
                            backgroundUrl="./static/img/card.png"
                            text="THEME DEVELOPMENT"
                        />
                        <ServiceCard
                            backgroundUrl="./static/img/card.png"
                            text="THEME DEVELOPMENT"
                        />
                        <ServiceCard
                            backgroundUrl="./static/img/card.png"
                            text="THEME DEVELOPMENT"
                        />
                        <ServiceCard
                            backgroundUrl="./static/img/card.png"
                            text="THEME DEVELOPMENT"
                        />
                        <ServiceCard
                            backgroundUrl="./static/img/card.png"
                            text="THEME DEVELOPMENT"
                        />
                        <ServiceCard
                            backgroundUrl="./static/img/card.png"
                            text="THEME DEVELOPMENT"
                        />
                        <ServiceCard
                            backgroundUrl="./static/img/card.png"
                            text="THEME DEVELOPMENT"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
