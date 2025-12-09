import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 py-6 px-8 transition-all duration-500 ${isHome ? 'bg-transparent' : 'bg-black/60 backdrop-blur-md border-b border-white/5'}`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                    VSC
                </Link>

                <div className="flex gap-8 items-center">
                    <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
                    <Link to="/gallery" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Gallery</Link>
                    <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</a>
                    <button className="px-5 py-2 text-xs font-semibold bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                        Join Community
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
