import React from 'react'

export default function LoadSpinner2() {
    return (
        <div class='conteneur'>
            <div class="conteneur__loader">
                <span class="conteneur__loader--filtre"></span>
                <span class="conteneur__loader--filtre"></span>
                <span class="conteneur__loader--filtre"></span>   
                <span class="conteneur__loader--filtre"></span> 
                <span class="conteneur__loader--filtre"></span>     
                <span class="conteneur__loader--filtre">
                    <span class="conteneur__loader--filtre--sat"></span>
                    <span class="conteneur__loader--filtre--sat"></span>
                    <span class="conteneur__loader--filtre--sat"></span>
                </span>    
                <span class="conteneur__loader__texte">ohmyfood
                    <span  class="conteneur__loader__texte--proj"></span>
                    <span  class="conteneur__loader__texte--texte">ohmyfood</span>
                </span>  
                <span class="conteneur__loader__icone"><i class="fas fa-utensils"></i></span>  
                <span class="conteneur__loader--point">
                    <span class="point"></span>
                    <span class="point"></span>
                    <span class="point"></span>
                    <span class="point"></span>
                    <span class="point"></span>
                </span> 
            </div> 
        </div>
    )
}
