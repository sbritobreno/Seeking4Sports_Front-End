import Logo from '../../assets/img/logo.png'

function Navbar() {
    return (
        <nav>
            <div>
                <img src={Logo} alt="S4S" />
                <h2>Seeking 4 Sports</h2>
            </div>
        </nav>
    )
}

export default Navbar