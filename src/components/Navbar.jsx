import React, { useState } from 'react';
import Menu from '../assets/Menu';
import logo from "../assets/ytLogo.png";
import { Link } from 'react-router-dom';
import { setSidebarExtendedValue } from '../redux/categorySlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

function Navbar({ sidebarExtended, setSidebarExtended }) {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const pageRoute = useNavigate(); // Hook to navigate programmatically
  const [searchValue, setSearchValue] = useState(""); // Local state to track search input value

  // Fetch loading states from the Redux store
  const { isLoading } = useSelector((state) => state.category);
  const channelLoading = useSelector((state) => state.channel.isLoading);
  const videoLoading = useSelector((state) => state.video.isLoading);
  const searchLoading = useSelector((state) => state.search.isLoading);

  // Handle form submission for the search bar
  const handleOnSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    pageRoute(`/search/${searchValue}`); // Navigate to the search results page
    e.target.value = " "; // Clear the search input (though this may not be necessary)
  };

  return (
    <>
      {/* Navbar container */}
      <div className='h-[50px] fixed z-10 bg-[#ffff] w-[100%]'>
        {/* Show loading progress bar if any loading state is true */}
        {
          videoLoading || channelLoading || isLoading || searchLoading ?
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="error" />
            </Stack> : ""
        }

        <nav className='flex h-[60px] items-center space-x-2 lg:space-x-20 xl:space-x-64'>
          {/* Logo and Menu Button */}
          <div className='flex items-center pl-2 ml-3 -mt-4 space-x-4'>
            <button onClick={() => {
              dispatch(setSidebarExtendedValue(!sidebarExtended)); // Update sidebar state in Redux store
              setSidebarExtended(!sidebarExtended); // Update local sidebar state
            }}>
              <Menu />
            </button>
            <Link to='/'>
              <img className='w-10' src={logo} alt="WatchBox Logo" />
            </Link>
          </div>

          {/* Search bar form */}
          <form onSubmit={handleOnSubmit} className='-mt-3'>
            <div className="relative w-[170px] sm:w-[420px] ">
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                type="search"
                name='search'
                id="default-search"
                className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-[1px] border-[#cccccc] focus:outline-none"
                placeholder="Search"
                required
              />
              <button type="submit" className="text-white absolute right-0 bottom-0 top-0 font-medium text-sm px-4 py-2 bg-[#f8f8f8] border-[1px] border-[#cccccc]">
                <svg className="dark:text-gray-400 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </form>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
