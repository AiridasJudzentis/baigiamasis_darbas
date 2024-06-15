const Navigation = () => {
  return (
    <nav>
      <div>
        <h1 className="logo">
          <a href="/">Model Marketplace</a>
        </h1>
      </div>
      <ul>
        <li>
          <a href="/cart">Cart</a>
        </li>
        <li>
          <a href="/signup">Sign Up</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/upload">Upload</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
