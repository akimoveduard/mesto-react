import Logo from '../images/logo.svg';

function Header() {
  
  return (
    <header className="header">
      <img className="logo" src={Logo} alt="Mesto Russia" />
    </header>
  );
}

export default Header;