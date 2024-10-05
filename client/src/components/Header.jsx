import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Header = () => {
  const {currentUser} = useSelector(store => store.user);
  const [searchTerm, setSearchTerm] = useState('');
  const naviagte = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    naviagte(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search])

  return (
    <header className="bg-slate-300 ">
      <div className="flex justify-between mx-4 sm:mx-8 xl:mx-auto max-w-6xl py-4 ">
        <div className="text-xl font-bold">
          <span className="text-slate-600">Delux</span>
          <span className="text-slate-800">Estate</span>
        </div>
        <form onSubmit={handleSubmit} className='bg-slate-200 flex items-center rounded-lg py-1 px-2'>
          <input
            className="sm:inline bg-transparent focus:outline-none"
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className='text-slate-600 mx-1' />
            </button>
        </form>
        <ul className="flex gap-4 text-lg">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser? (              
              <img 
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar} 
                alt='Profile'
              />
            ) : (
              <li className="hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
