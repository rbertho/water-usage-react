import FormRenter from '../components/FormRenter';
import NavMenu from '../components/NavMenu';

function About() {
    return (
        <div>
            <div className="app">
                <div id='renter-details'>
                    <FormRenter />
                </div>
                <div id='nav-menu'>
                    <NavMenu />
                </div>
                <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
                    <div className="p-5 bg-white rounded shadow w-75">
                        <h1 className="mb-3">Sobre o Smart Water</h1>
                        <p className="lead">Smart Water é um aplicativo que ajuda você a gerenciar o seu consumo de água de uma forma prática e inovadora.</p>
                        <hr className="my-4" />
                        <p>Versão do app: 0.1</p>
                        <p>Desenvolvido por @berthao</p>            
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default About;