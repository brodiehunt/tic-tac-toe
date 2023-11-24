import logo from '/src/assets/logo.svg';


function Logo() {

    return (
        <div className="logo-container">
            <img src={logo} className="logo" alt="Tic-tac-toe Logo" />
        </div>
    )
}

export default Logo;