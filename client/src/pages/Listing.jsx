import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

// Icons
import {
  FaLocationDot,
  FaBed,
  FaBath,
  FaChair,
  FaSquareParking,
  FaShare,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  console.log(listing);
  return (
    <main>
      {loading && (
        <p className="text-4xl text-gray-500 text-center mt-5">Loading...</p>
      )}
      {error && (
        <p className="text-4xl text-gray-500 text-center mt-5">
          Something went wrong!
        </p>
      )}
      {listing && !error && !loading && (
        <div className="mb-10">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="max-w-2xl mx-auto p-3">
            <h1 className="text-3xl font-semibold py-10">
              {listing.name} - ${" "}
              <span>
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" ? " / month" : ""}
              </span>
            </h1>
            <p className="flex gap-2 items-center text-l pb-2">
              <FaLocationDot className="text-green-800 inline" />
              <span>{listing.address}</span>
            </p>
            <div className="flex gap-3">
              <p className="p-1 my-5 text-center  w-full max-w-[10rem] bg-red-900 text-white font-semibold rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="p-1 my-5 text-center  w-full max-w-[10rem] bg-green-900 text-white font-semibold rounded-md">
                 ${ (+listing.regularPrice - +listing.discountPrice).toLocaleString("en-US") } OFF
                </p>
              )}
            </div>

            <p className="text-l py-5">
              <span className="font-semibold">Description - </span>
              <span>{listing.description}</span>
            </p>
            <div className="flex gap-5 font-semibold flex-wrap my-5">
              <span className="flex gap-1 items-center text-green-900">
                <FaBed className="inline" />
                {listing.bedrooms} Beds
              </span>
              <span className="flex gap-1 items-center text-green-900">
                <FaBath className="inline" /> {listing.bathrooms} Baths
              </span>
              {listing.parking ? (
                <span className="flex gap-1 items-center text-green-900">
                  <FaSquareParking className="inline" /> Parking spot
                </span>
              ) : (
                ""
              )}
              {listing.furnished ? (
                <span className="flex gap-1 items-center text-green-900">
                  <FaChair className=" text-green-900inline" />
                  Furnished
                </span>
              ) : (
                <span className="text-green-900">Not furnished</span>
              )}
            </div>
            {currentUser &&
              listing?.userRef !== currentUser?._id &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="bg-slate-600 text-white w-full p-3 rounded-lg uppercase hover:opacity-95"
                >
                  Contact Landlord
                </button>
              )}
              {contact && (
                <Contact listing={listing}/>
              )}
          </div>
        </div>
      )}
    </main>
  );
}
