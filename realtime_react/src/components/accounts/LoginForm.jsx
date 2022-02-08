function UserLoginForm() {
  return (
    <div className="mt-32">
      <h2 className="text-2xl my-5">Login</h2>
      <div>
        <input
          placeholder="ID"
          className="placeholder:italic placeholder:text-slate-400 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <div>
        <input
          placeholder="PASSWORD"
          className="placeholder:italic placeholder:text-slate-400 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
    </div>
  );
}

export default UserLoginForm;
