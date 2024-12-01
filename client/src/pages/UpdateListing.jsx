import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {useSelector} from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {
  const {currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 50,
    offer: false,
    parking: false,  
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    }
    fetchListing();
  }, [params.listingId]);

  // handle image upload
  const handleImageSubmit = () => {
    setUploading(true);
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      // TODO: didn't understood how the urls is coming in the promise
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed (2 mb max image size)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 image per listing");
      setUploading(false);
    }
  };

  // Upload each image one by one
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(Math.round(progress));
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    // the value of 'type' is text but depends on the value of checkboxes
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    // updating data of checkboxes in the form
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        // using bracket [] to get it as 'variable' not as a 'string'
        [e.target.id]: e.target.checked,
      });
    }

    // for rest type of form input
    // the way of updating value of range, numbers, text and textarea are all same
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id, 
        }),
      });
      const data = await res.json();
      setLoading(false);
      if(data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch  (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center p-3">Update Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="p-3 rounded-lg"
            maxLength="60"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            className="p-3 rounded-lg "
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="p-3 rounded-lg"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="py-3 flex flex-wrap gap-5">
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="py-3 grid grid-cols-2 justify-items-stretch gap-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="0"
                max="10"
                required
                className="px-3 py-1 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="0"
                max="10"
                required
                className="px-3 py-1 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                required
                className="px-3 py-1 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {formData.type === 'rent' && 
                  <span className="text-sm text-gray-600">($ / month)</span>
                }
              </div>
            </div>
            {formData.offer &&
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000000"
                  required
                  className="px-3 py-1 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discount price</p>
                  {formData.type === 'rent' &&
                    <span className="text-sm text-gray-600">($ / month)</span>
                  }
                </div>
              </div>
            }
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
              onChange={(e) => setFiles(e.target.files)}
              multiple
              className="p-3 border border-gray-300 rounded-lg w-full hover:shadow-md"
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="uppercase rounded-lg border border-green-700 text-green-700 font-semibold py-3 px-5 hover:shadow-lg hover:bg-green-700 hover:text-white disabled:opacity-80"
            >
              {uploading ? "uploading..." : "upload"}
            </button>
          </div>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className="flex justify-between p-3 items-center">
                <img
                  src={url}
                  alt="listing image"
                  className="w-32 object-contain rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="uppercase text-red-700 font-semibold h-8 px-3 rounded-lg hover:opacity-75"
                >
                  delete
                </button>
              </div>
            ))}
          <button 
          disabled={loading || uploading}
          className="uppercase text-white bg-gray-700 p-3 my-4 rounded-lg w-full hover:shadow-lg">
            {loading ? 'updating...' : 'update listing'}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}