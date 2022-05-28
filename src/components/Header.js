import Logo from '../images/logo.svg';

function Header() {
  
  return (
    <header className="header">
      <img className="logo" src={Logo} />
    </header>
  );
}

export default Header;