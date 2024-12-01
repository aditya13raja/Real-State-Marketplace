import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const onchange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  return (
    <>
      {!landlord ? (
        ""
      ) : (
        <div>
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onchange}
            placeholder="Enter your message here..."
            className="w-full border-2 border-gray-200 p-2 rounded-xl"
          ></textarea>
          <Link 
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="w-full bg-slate-700 p-3 text-white uppercase font-semibold my-3 hover:opacity-95 rounded-md">
              Send Message
          </Link>
        </div>
      )}
    </>
  );
}
