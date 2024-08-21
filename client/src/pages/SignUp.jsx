import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold my-7 mx-auto text-center">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="username" 
          id="username"
          className="p-3 border rounded-lg text-lg"
        />
        <input 
          type="text" 
          placeholder="email" 
          id="email"
          className="p-3 border rounded-lg text-lg"
        />
        <input 
          type="text" 
          placeholder="password" 
          id="password"
          className="p-3 border rounded-lg text-lg"
        />
        <button className="text-white bg-slate-800 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5 font-semibold'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      <Link></Link>
    </div>
  )
}
