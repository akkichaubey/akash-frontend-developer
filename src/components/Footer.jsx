import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className="py-4 bg-black">
                <div className="container">
                    <div className="pb-2">
                        <Logo color="text-white" />
                    </div>
                    <div className="text-sm leading-snug text-white">
                        Copyright &copy; 2009 - 2024
                        <Link to="/" className="hover:text-primary ml-1">
                            Brainstorm Force
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
