import FormRenter from "../components/FormRenter";
import NavMenu from "../components/NavMenu";

function NotFound() {
    return (
        <div>
            <div id='renter-details'>
                <FormRenter />
            </div>
            <div id='nav-menu'>
                <NavMenu />
            </div>
            <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
                <div className="p-5 bg-white rounded shadow w-50">
                    <h1 className="mb-3">Not Found!!</h1>
                    <p className="lead">HTTP 404</p>
                    <a href="/">Home</a>
                </div>
            </div>
        </div> 
    );
}

export default NotFound;