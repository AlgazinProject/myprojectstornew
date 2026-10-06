"use client";
import { useState, useEffect } from 'react';
import './Preloader.scss';

const Preloader = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500);


        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    const getIconUrl = (name) => `/icons/${name}`;

    return (
        <div className="preloader">
            <div className="preloader__logo-box">
                <img
                    src={getIconUrl('Stone-Island-Logo.svg')}
                    alt="Stone Island"
                    className="preloader__logo"
                />
            </div>
        </div>
    )



}

export default Preloader