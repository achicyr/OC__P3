import {useEffect, useState, useContext} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../utils/auth'
// import LoaderSpinner from './components/_/LoaderSpinner'
import LoaderSpinner2 from './../../components/_/LoaderSpinner2'


function Jumbotron({data, bem}) {
	

	return <nav className={bem}>
	  {/*} <i className="fa-solid fa-location-dot"></i> */}
	  {/*} input.jumbotron__form[placeholder="Paris, Belleville" type="search" id="search"]+label[htmlFor="search"]>i.fas.fa-location-dot */}
	  <form className={bem+"__form"}>
		<label htmlFor="search">
		  {/* <i className="fas fa-location-dot"></i> */}
		  <input type="search" placeholder={data.form.input[0]} id="search" />
		</label>
	  </form>
	  {/* section.jumbotron__section>h1{Réserver le menu qui vous convient}+p{Découvrez des restaurants d'exception sélectionnées par nos soins}+a[href="#"]{Explorer nos restaurants} */}
	  <section className={bem+"__section"}>
		<h1>{data.section.h1[0]}</h1>
		<p>
		  {data.section.p[0]}
		</p>
		<Link to="#">{data.section.a[0]}</Link>
	  </section>
	</nav>
}

function ListeNumerotee({data, bem}) {
	// console.log(data);
	
	return <section className={bem}>
		{/* h2.fonctionnement__titre{Fonctionnement}+ol.fonctionnement__liste>li*3>i.fas.fa-+h3{Choisissez un restaurant} */}
		<h2 className={bem+"__titre"}>{data.titre[0]}</h2>
		<ol className={bem+"__liste --numerotee_0 --iconed_0 --hoverable_0"}>
			{data.liste.map((item,key)=><li key={key}>
					<h3>{item[0]}</h3>
				</li>
			)}
		</ol>
	</section>
}
function Cards({data, bem, subComponent}) {
	
	return <article className={bem}>
		{/* <i className="fa-solid fa-heart"></i> */}
		{/* h2.restaurants__titre{Restaurants}+figure.restaurants__card.cards*4>a.cards__makeClickable[href="/menu-$.html"]+img.cards__image[src="assets/images/restaurants/restaurant-$.jpg" alt="Les plat du restaurant 'La palette du goût'"]+figcaption.cards__content>h3{La palette du goût}+p{Ménilmontant}+input[id="card-$" type="checkbox"]+label[htmlFor="card-$"] */}
		<h2 className={bem+"__titre"}>{data.titre[0]}</h2>
		{ data.card.cards.map((card,key) => {
			return <CardFigure key={key} key_={key} data={data.card.cards[key]} bem={subComponent} className={bem+"__card"} />
		}) }
	</article>
}
function CardFigure({data, bem, key_}) {
	console.log(data)
	console.log(user_)

	const id_menu = data.makeClickable[1].to.substr(data.makeClickable[1].to.lastIndexOf('/')+1)
	, handelClick = () => {
		// alert('ok', user_)
		console.log(user_)
		// setUser_({...user_,liked:[...user_.liked,id_menu]})
	}
	, checked = user_?.liked?.find(x=>x==id_menu)?"checked":"false"
	
	return <figure className={bem}>
		<Link to={data.makeClickable[1].to} className={bem+"__makeClickable"}></Link>
		<img src={data.image[1].src} alt={data.image[0]} className={bem+"__image"} />
		<figcaption className={bem+"__content"}>
			<h3>{data.content[0].h3}</h3>
			<p>{data.content[0].p}</p>
			<input type="checkbox" id={"card-"+key_} {...(user_?.liked?.find(x=>x==id_menu) ? {checked:"checked"} : {})} />
			<label htmlFor={"card-"+key_} onClick={()=>{handelClick()}}></label>
		</figcaption>
	</figure>
}
let user_,setUser_

function Home() {

	let [Contents, setContents] = useState([])
	, {token, datas, user, setUser, setDatas, setOnHome} = useContext(AuthContext)
    , navigate = useNavigate()
	, generateOutput = (contents) => {
		if(contents){
			let { fonctionnement, restaurants, jumbotron } = contents
			, contents_tmp = []
			console.log(contents)

			contents_tmp.push(<Jumbotron data={jumbotron} bem="jumbotron" />)
			contents_tmp.push(<ListeNumerotee data={fonctionnement} bem="fonctionnement" />)
			contents_tmp.push(<Cards data={restaurants} bem="restaurants" subComponent="cards"/>)
			setContents(contents_tmp)
		}
	}
	[user_,setUser_] = [user, setUser]
	console.log(token)

	
    useEffect(() => {
        setOnHome(true)
		console.log(datas)
		console.log(token)
        console.log("1,2, teste, test, 1,2, test")
	    // if(!token)navigate('/login/menu')
		// else generateOutput(datas.home)
		generateOutput(datas?.home)
	}, [datas])

	

	
	return <>
		<LoaderSpinner2 />
		{Contents}
	</>
}
export default Home


