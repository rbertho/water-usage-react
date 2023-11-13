const NavMenu = () => {
    return (
        <ul className="nav nav-tabs justify-content-center" id="navmenu">
            <li className="nav-item">
                <a className="nav-link active" href="/">Diário</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Mensal</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Perfil</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="./about">About</a>
            </li>
        </ul>
    )
}  

export default NavMenu