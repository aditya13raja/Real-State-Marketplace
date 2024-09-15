import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center p-3">Create Listing</h1>
      <form className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="p-3 rounded-lg"
            maxLength="60"
            minLength="10"
            required
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            className="p-3 rounded-lg "
            required
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="p-3 rounded-lg"
            required
          />

          <div className="py-3 grid grid-cols-3 gap-2">
            <div className="flex gap-2 ">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="py-3 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="0"
                max="10"
                placeholder="0"
                required
                className="px-3 py-1 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="0"
                max="10"
                placeholder="0"
                required
                className="px-3 py-1 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="0"
                max="10"
                placeholder="0"
                required
                className="px-3 py-1 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-sm text-gray-600">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="0"
                max="10"
                placeholder="0"
                required
                className="px-3 py-1 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discount price</p>
                <span className="text-sm text-gray-600">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold py-3">
            Images:{" "}
            <span className="font-normal text-gray-600">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-2">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded-lg w-full hover:shadow-md"
            />
            <button className="uppercase rounded-lg border border-green-700 text-green-700 font-semibold py-3 px-5 hover:shadow-lg hover:bg-green-700 hover:text-white disabled:opacity-80">
              upload
            </button>
          </div>
          <button className="uppercase text-white bg-gray-700 p-3 my-4 rounded-lg w-full hover:shadow-lg">create listing</button>
        </div>
      </form>
    </main>
  );
}
