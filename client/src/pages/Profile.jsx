import { useSelector } from "react-redux";

export default function Profile() {
  const {currentUser} = useSelector(store => store.user);
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-3">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile" className="rounded-full self-center p-4 cursor-pointer"/>
        <input 
          type="text" 
          placeholder="username" 
          id="username" 
          className="p-3 w-full rounded-lg text-xl"
        />
        <input 
          type="email" 
          placeholder="email" 
          id="email" 
          className="p-3 w-full rounded-lg text-xl"
        />
        <input 
          type="text" 
          placeholder="password" 
          id="password" 
          className="p-3 w-full rounded-lg text-xl"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase">update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
