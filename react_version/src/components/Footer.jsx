import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <>
      <footer className="footer">
        {/* <i className="fa-solid fa-utensils"></i> */}
        {/* <i className="fa-solid fa-handshake-angle"></i> */}
        {/* footer.footer>h4.footer__titreLogo{ohmyfood}+(h5.footer__titreIcon*2>i.fas.fa-+span{Porposer un restaurant})+a.footer__lien*2[href="#"]{Mentions légales} */}
        <h4 className="footer__titreLogo">ohmyfood</h4>
        <h5 className="footer__titreIcon">
          <i className="fas fa-"></i>
          <span>Porposer un restaurant</span>
        </h5>
        <h5 className="footer__titreIcon">
          <i className="fas fa-"></i>
          <span>Porposer un restaurant</span>
        </h5>
        <a href="#" className="footer__lien">Mentions légales</a>
        <a href="#" className="footer__lien">Contact</a>
      </footer>
      <div className="modal">
        <div>
          ???.;.:.<span>Oh</span>
          <span>My</span>
          <span>FoOd</span>.;.:.!!!
        </div>
      </div>
    </>
  );
}
