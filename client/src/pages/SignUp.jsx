import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange= (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error){
      setLoading(false);
      setError(error.message);
    }
    
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold my-7 mx-auto text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="username" 
          id="username"
          onChange={handleChange}
          className="p-3 border rounded-lg text-lg"
        />
        <input 
          type="text" 
          placeholder="email" 
          id="email"
          onChange={handleChange}
          className="p-3 border rounded-lg text-lg"
        />
        <input 
          type="text" 
          placeholder="password" 
          id="password"
          onChange={handleChange}
          className="p-3 border rounded-lg text-lg"
        />
        <button
          disabled={loading} 
          className="text-white bg-slate-800 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading?"Loading..." :  "Sign Up"}
        </button>
      </form>
      <div className='flex gap-2 mt-5 font-semibold'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  )
}
