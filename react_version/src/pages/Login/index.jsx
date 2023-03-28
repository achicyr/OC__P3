import { useContext, useParams, useState } from 'react'
import { AuthContext } from '../../utils/auth'
import { Link, Navigate, useNavigate } from "react-router-dom"
import styled from 'styled-components'


const FormStyled = styled.form`
    display: grid;
    grid-template: "titre1 titre2" "input1 input2" "  btn btn  ";
    padding: 2em;
    gap: 1em;
    >input,>button{padding:.5em;}
    >label{margin-bottom: -.75em;}
    >label:nth-of-type(1){grid-area:titre1}
    >label:nth-of-type(2){grid-area:titre2}
    >input:nth-of-type(1){grid-area:input1}
    >input:nth-of-type(2){grid-area:input2}
    >button{grid-area:btn}
`



export default function Login({path}) {

    const [goSignin, setGoSignin] = useState(false)
    , pathBack = "" /*"/"+useParams()?.back || "/"*/
    // , [goLogin, setGoLogin] = useState(false)
    , navigate = useNavigate()
    , {token, setToken, user, setUser} = useContext(AuthContext)
    let doError = false

    console.log(path)
    if(token)navigate('/')
    if(path=="logout"){
        setToken(false)
        navigate("/")
    }
    
    const handleSubmit = (e) => { 
        e.preventDefault()
    
        fetch("http://localhost:3000/api/auth/" + path, {
            method: "POST"
            , mode: "cors"
            , headers:{"Content-type":"application/json"}
            , body: JSON.stringify({username: document.getElementById('username').value,password: document.getElementById('password').value})
        })
            .then(res=>{
                // console.log(res)
                if(!res.ok && path == "login")doError=true
                if(res.ok && path == "signup"){
                    setGoSignin(false)
                    // navigate("/")
                }
                // console.log(doError)
                return res.json()
            })
            .then(res=>{
                console.log(res)
                console.log(doError)
                console.log(path)
                if(doError){setGoSignin(res.message)}
                if(res.token){
                    // if(path=="signin"){username,role,userId} = res._doc
                    console.log(res);
                    setToken(res.token)
                    setUser({
                        id: path=="login"?res.userId:res._doc._id
                        , role: path=="login"?res.role:res._doc.role
                        , liked: path == "login"?res.liked:res._doc.liked
                    })
                    console.log(user);
                    navigate('/')
                    // navigate('/menu/1')

                }
            })
            // .catch(error=>{
            //     console.log('erreur')
            // })
    }
    console.log(user);
    return (
        <FormStyled onSubmit={handleSubmit}>
            <label htmlFor="username')">Pseudonyme
            </label>
                <input type="text" id="username" name="username" />
            <label htmlFor="password">Mot de passe
            </label>
                <input type="password" id="password" name="password" />
            <button>{path}</button>
            
            { path == "login" && goSignin && <><p>{goSignin}</p><Link to={'/signup'+pathBack}>S'enregistrer ?</Link></>}
        </FormStyled>
    )
}