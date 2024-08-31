import {FaSearch} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Header = () => {
  const {currentUser} = useSelector(store => store.user);
  console.log(currentUser);
  return (
    <header className="bg-slate-300 ">
      <div className="flex justify-between mx-4 sm:mx-8 xl:mx-auto max-w-6xl py-4 ">
        <div className="text-xl font-bold">
          <span className="text-slate-600">Delux</span>
          <span className="text-slate-800">Estate</span>
        </div>
        <form className='bg-slate-200 flex items-center rounded-lg py-1 px-2'>
          <input
            className="hidden sm:inline bg-transparent focus:outline-none"
            type="text" 
            placeholder="Search..." 
            />
            <FaSearch className='text-slate-600 mx-1' />
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
