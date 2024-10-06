import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-5 ">
            <label className="whitespace-nowrap font-semibold">Search Term: </label>
            <input
              type="text"
              placeholder="Search..."
              id="searchTerm"
              className="p-3 rounded-md w-full"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="all" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-4">
          <label className="font-semibold">Amenities: </label>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <label className="font-semibold">Sort: </label>
            <select id="sort_order" className="p-2 rounded-md border">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="p-3 bg-slate-700 hover:opacity-95 rounded-xl text-white uppercase font-semibold">Search</button>
        </form>
      </div>
      <div className="mt-4 p-7">
        <h1 className="text-slate-700 font-semibold text-3xl">Listing results: </h1>
      </div>
    </div>
  );
}
