import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showmore, setShowmore] = useState(false);

  console.log(listings);

  const handleChange = (e) => {
    if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id=== 'offer' || e.target.id === 'parking' || e.target.id === 'furnished') {
      setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // sending search query to the url as parameters
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // getting params value and update form data accordingly
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',  
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,  
        furnished: furnishedFromUrl === 'true' ? true : false,  
        offer: offerFromUrl === 'true' ? true : false,  
        sort: sortFromUrl || 'created_at',  
        order: orderFromUrl || 'desc',  
      });
    }

    // Geting listings from the database
    const fetchListings = async () => {
      setLoading(true);
      setShowmore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowmore(true);
      } else {
        setShowmore(false); 
      }
      setListings(data);
      setLoading(false);
    } 
    fetchListings();
  }, [location.search])

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    setListings([...listings, ...data]);
    if(data.length < 9) { 
      setShowmore(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-5 ">
            <label className="whitespace-nowrap font-semibold">
              Search Term:{" "}
            </label>
            <input
              type="text"
              placeholder="Search..."
              id="searchTerm"
              className="p-3 rounded-md w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="all"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="rent"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="sale"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="offer"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-4">
            <label className="font-semibold">Amenities: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="parking"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="furnished"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <label className="font-semibold">Sort: </label>
            <select
              id="sort_order"
              className="p-2 rounded-md border"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Newest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="p-3 bg-slate-700 hover:opacity-95 rounded-xl text-white uppercase font-semibold">
            Search
          </button>
        </form>
      </div>
      <div className="mt-2 p-7">
        <h1 className="text-slate-700 font-semibold text-3xl">
          Listing results:{" "}
        </h1>
        <div className="flex flex-wrap gap-8 py-7">
          {!loading && listings.length === 0 &&(
            <p className="text-slate-700 mt-5">No listings found 😒</p>
          )}
          {loading && (
            <p className="text-slate-700 mt-5">Loading...</p>
          )}
          {!loading && listings.length > 0 && (
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))
          )}

          {showmore && (
            <button onClick={onShowMoreClick} className="text-green-700 mt-5 text-center w-full hover:underline font-semibold">
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
