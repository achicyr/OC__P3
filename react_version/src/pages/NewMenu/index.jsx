import { useState, useContext } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../utils/auth'
import styled from 'styled-components'


const Form = ({inputs}) => {
    // const defaultTemplates = {
    //     login0: [
    //         `Votre pseudonyme|||input#pseudo*pseudo$text%Entrer votre pseudonyme`
    //         , `Votre mot de passe|||input#password*password$text%********`
    //         , `|||input"S'authentifier"`
    //     ]
    //     , login0: [
    //         `Votre email|||input#pseudo*pseudo$text%votre-adresse@email.com`
    //         , `Votre mot de passe|||input#password*password$text%********`
    //         , `|||input"S'authentifier"`
    //     ]
    // }
    // , outputContent = (str) => {
    //     const [forLabel, forInput] = str.split('|||')
    //     , inputType = forInput.substr(0,forInput.indexOf("#"))
    //     const label = <label>{forLabel}</label>
    //     , input = <input />
    // }
    {inputs.map((inputObject,key) => {
        
        let label = <label htmlFor={inputObject.input[1]?.id}>{inputObject.label[0]}</label>
        , labelContaining = inputObject.label?.[1]?.containing || false
        , input = inputObject?.input[0]
        
        return <fieldset>
            
        </fieldset>
    }
    )}
}
, handleNewSubmit = (e) => {
    e.preventDefault()
    let body = {entrees:[],plats:[],desserts:[]}
    , inputentrees = Array.from(document.querySelectorAll('.entrees')).map(f => Array.from(f.querySelectorAll('input')).map((i) => i.value)).forEach(v => { body.entrees.push({titre: v[0],soustitre: v[1],prix: v[2]}) })
    , inputplats = Array.from(document.querySelectorAll('.plats')).map(f => Array.from(f.querySelectorAll('input')).map((i) => i.value)).forEach(v => { body.plats.push({titre: v[0],soustitre: v[1],prix: v[2]}) })
    , inputdesserts = Array.from(document.querySelectorAll('.desserts')).map(f => Array.from(f.querySelectorAll('input')).map((i) => i.value)).forEach(v => { body.desserts.push({titre: v[0],soustitre: v[1],prix: v[2]}) })
    body = {[e.target.restaurant.value]: body, lieu: e.target.lieu.value}
    console.log(body);
    console.log(inputentrees);
    console.log(document.querySelectorAll('.entrees'));

    // Array.from(new FormData(e.target).entries()).forEach(v=>{body[v[0]] = v[1]})

    body = JSON.stringify(body)
    console.log(body)
    fetch("http://localhost:3000/api/data/menu/new", {
        method: "POST"
        , mode: "cors"
        , headers: {"Content-Type": "application/json"}
        , body
    })
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
        })
}
, handleUpdateSubmit = () => {}
, handleUpdateDelete = () => {}




export default function NewMenu({path}) {

    const id = useParams().id || ""
    , navigate = useNavigate()
    , [entreeCpt, setEntreeCpt] = useState(0)
    , [platCpt, setPlatCpt] = useState(0)
    , [dessertCpt, setDessertCpt] = useState(0)
    , [Contents, setContents] = useState({entrees:[],plats:[],desserts:[]})
	, {token, datas, setDatas} = useContext(AuthContext)
    , handleAddBtn = (type) => {

        const types = ["entrees","plats","desserts"]
        , cpt = [entreeCpt,platCpt,dessertCpt]
        
        setContents({
            ...Contents
            , [types[type]]: [
                ...Contents[types[type]]
                , <fieldset className={types[type]}>
                    <label htmlFor={cpt[type]+types[type]+"|titre"}>Titre</label>
                    <input id={cpt[type]+types[type]+"|titre"} name={cpt[type]+types[type]+"|titre"} data-name="titre" required/>
                    <label htmlFor={cpt[type]+types[type]+"|soustitre"}>Sous-titre</label>
                    <input id={cpt[type]+types[type]+"|soustitre"} name={cpt[type]+types[type]+"|soustitre"} data-name="soustitre" required/>
                    <label htmlFor={cpt[type]+types[type]+"|prix"}>Prix</label>
                    <input id={cpt[type]+types[type]+"|prix"} name={cpt[type]+types[type]+"|price"} data-name="prix" required/> €
                    <section>
                        <button onClick="handleAdd" type="button">+</button>
                        <button onClick="handleRemove" type="button">-</button>
                    </section>
                </fieldset>
            ]
        })
    }
    , handleAdd = () => {}
    , handleRemove = () => {}
    
    const FormStyled = styled.form`
        display: grid;
        grid-template: "a a" "h2a h2b" "b c" "h2c h2c" "d d";
        min-height:500px;
        >fieldset:first-of-type{grid-area:a;display:flex;flex-flow:wrap;>label{width:100%;}}
        >h2:first-of-type{grid-area:h2a;}
        #entrees{grid-area:b;}
        #entrees+h2{grid-area:h2b;}
        #plats{grid-area:c;}
        #plats+h2{grid-area:h2c;}
        #desserts{grid-area:d;}
        >h2{text-align:center;
        >h2~fieldset{
            display:grid;
            grid-template: "a b c";
            >fieldset{
                display:flex;
                flex-flow:wrap;
                position:relative;
                >label{width:100%;}
                >section{
                    position:absolute;top:0;right:0;
                    >*{margin:.5em;cursor:pointer;}
                }
            }
        }
    `
	// if(!token)return <Navigate replace to="/login/newmenu" />
    console.log(token);
    if(!token)navigate('/login')
    else if(path == "update"){
        // alert('up')
        console.log(Object.values(datas.menus.carte)[id])
        let a, aa, data = Object.values(datas.menus.carte)[id]
        , types = ["entrees","plats","desserts"]
        for(a in data){
            data[a] = data[a].map((obj,key) => {
                const arr = []
                console.log(obj);
                for(let aa in obj){
                    // console.log(aa);
                    // console.log(obj[aa]);
                    arr.push(<>
                        <label htmlFor={key+(types[a])+"|"+aa}>Titre</label>
                        <input id={key+(types[a])+"|"+aa} name={key+(types[a])+"|"+aa} data-name={types[a]} value={obj[aa]} required/>
                    </>)
                }
                return <fieldset className={types[a]}>
                    {arr}
                </fieldset>
                // if(a=="entrees")handleAddBtn(0, obj)
                // if(a=="plats")handleAddBtn(1, obj)
                // if(a=="desserts")handleAddBtn(2, obj)
            })
        }
        console.log(data);
        return <FormStyled className="formAdd" onSubmit={handleUpdateSubmit}>
            <fieldset key={1}>
                <label>Nom du restaurant</label>
                <input name="restaurant" required/>
                <label>Lieu du restaurant</label>
                <input name="lieu" required/>
            </fieldset>
            {data.entrees}
            {data.plats}
            {data.desserts}
        </FormStyled>
    }
    else if(path=="delete"){
        let doDelete = window.confirm("Are you sure you want to delete this items ?")
        if(doDelete)
            fetch("http://localhost:3000/api/data/menu/delete/"+id, {
                method: "DELETE"
                , mode: "cors"
                , headers: {"Content-Type": "application/json"}
            })
                .then(res=>res.json())
                .then(json=>{
                    console.log(json);
                })
    }
    else if(typeof path == "undefined")
    return <>
        <FormStyled className="formAdd" onSubmit={handleNewSubmit}>
            <fieldset key={1}>
                <label>Nom du restaurant</label>
                <input name="restaurant" required/>
                <label>Lieu du restaurant</label>
                <input name="lieu" required/>
            </fieldset>
            <h2>ENTRÉES <button onClick={()=>{handleAddBtn(0)}} type="button" title="Ajouter une entrée">+</button></h2>
            <fieldset key={2} id="entrees">
                {Contents.entrees}
            </fieldset>
            <h2>PLATS <button onClick={()=>{handleAddBtn(1)}} type="button" title="Ajouter un plat">+</button></h2>
            <fieldset key={3} id="plats">
                {Contents.plats}
            </fieldset>
            <h2>DESSERTS <button onClick={()=>{handleAddBtn(2)}} type="button" title="Ajouter une dessert">+</button></h2>
            <fieldset key={4} id="desserts">
                {Contents.desserts}
            </fieldset>
            <button>Envoyer</button>
        </FormStyled>
    </>
}
