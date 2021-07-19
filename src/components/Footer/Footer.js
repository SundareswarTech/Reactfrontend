import './Footer.css';

import footerLogo from '../../assets/amico.png';

function Footer(){
    return(
        <div className="Footer">
            <div>
                <div><div className="dashboardhub">DASHBOARDHUB</div><div><img src={footerLogo} alt="unavailable"></img></div></div>
                <div  className="footer-msg">
                    <div className="about-us">About Us</div>
                    <div className="about-us-text">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Footer;