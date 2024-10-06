import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full sm:w-[320px] inline-block">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing-image"
          className="h-[220px] sm:h-[230px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
      </Link>
      <div className="p-3 sm:p-4 flex flex-col gap-2 mt-3">
        <h2 className="text-xl truncate font-semibold text-slate-700">
          {listing.name}
        </h2>
        <p className="flex gap-1 items-center text-sm">
          <MdLocationOn className="h-4 w-4 text-green-700 inline" />
          <span className="text-gray-600 truncate">{listing.address}</span>
        </p>
        <p className="line-clamp-2">{listing.description}</p>
        <p className="text-lg text-slate-600 font-semibold">
          $
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")
          }
          {listing.type === "rent" ? " / month" : ""}
        </p>
        <div className="flex gap-2 items-center">
          {listing.bedrooms > 1 && (
            <p className="text-sm text-slate-600 font-semibold">{listing.bedrooms} Beds</p>
          )}
          {listing.bathrooms > 1 && (
            <p className="text-sm text-slate-600 font-semibold">{listing.bathrooms} Baths</p>
          )}
        </div>
      </div>
    </div>
  );
}
