import {useEffect, useState, useContext} from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../utils/auth'
import styled from 'styled-components'

const DivCRUDStyled = styled.div`
    display: flex;
    justify-content: center;
    gap: 1em;
`



const Carte = ({data, bem="", subComponent, updatableka, id}) => {
    const menuTitre = Object.keys(data)[0]
    , plats = data[menuTitre]
	, handelClick = () => {
		alert('ok', user_)
		console.log(user_);
		setUser_({...user_,liked:[...user_.liked,data.makeClickable[1].to]})
	}

    console.log(data)
    console.log(plats) 
    
    return <>
        <h1 className={bem+"__titre"}>
            {menuTitre}
            <input type="checkbox" id="heart" onClick={()=>{handelClick()}} />
            <label htmlFor="heart"></label>
            {updatableka.role=="2" && <DivCRUDStyled>
                <Link to={"/menu/update/"+id}><i className="fas fa-edit"></i></Link>
                <Link to={"/menu/delete/"+id}><i className="fas fa-trash-alt"></i></Link>
            </DivCRUDStyled>}
        </h1>
        {/** * IL FAUT TROUVER UNE SOLUTION AU FAIT QUE data DEVIENNE undefined !!! 
        {Object.keys(plats).map((typeMenu,key) => {
            let plat = {[typeMenu]: plats[typeMenu]}
            console.log(key)
            console.log(typeMenu)
            console.log(plat);
                    // return <Menus data={carte} bem="" subComponent="plat" />
            return <PlatSection key={key} className={bem+"__section"} data={plat} bem="plat" updatableka={updatableka} />
        })} */}
        <Link to="#" className="carte__btn">Commander</Link>
    </> 
}
function PlatSection({data, bem, key, className}) {
    // console.log(data);
    // console.log(Object.keys(data));
    // console.log(Object.keys(data)[0]);
    let titre = Object.keys(data)[0]
    , languettes = data[titre]

    return <section className={className+" "+bem}>
        <h2 className={bem+"__titre"}>{titre.toUpperCase()}</h2>
        <ul className={bem+"__liste"}>
            { languettes.map((languette,key_) => <li key={key+"_"+key_}>
                <h3>{languette.titre}</h3>
                <p><span>{languette.soustitre}</span><span>{languette.prix}</span></p>
            </li>)}
        </ul>
    </section>
    
}


let user_,setUser_

export default function Menus() {

    let id = useParams().id-- || 0
    , [Contents, setContents] = useState([])
	, {token, datas, setDatas, user, setUser} = useContext(AuthContext)
    , navigate = useNavigate()
    , [menuHTML, setTheMenu] = useState()
    , [menuTitre, setMenuTitre] = useState()
	, generateOutput = (contents) => { 
        let { carte } = contents
        , data = {[Object.keys(carte)[id]]: Object.values(carte)[id]}
		, contents_tmp = []
		console.log(data)
        console.log(contents)

		contents_tmp.push(<Carte data={data} bem="carte" subComponent="plat" updatableka={user} id={id} />)
		setContents(contents_tmp)
	}
	[user_,setUser_] = [user, setUser]
	console.log(token)
    console.log(datas) 

    
    useEffect(() => {
        console.log(token)
        console.log(datas) 
        console.log("1,2, teste, test, 1,2, test");
	    if(!token)navigate('/login/menu')
		else generateOutput(datas.menus)
    }, [user])

    
    return <>
        {Contents}
    </>
}


