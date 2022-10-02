import { catsData } from "./Data.js"

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')


emotionRadios.addEventListener('change',highlightCheckedOption)
getImageBtn.addEventListener('click', renderCat)


memeModalCloseBtn.addEventListener('click',function(){
    memeModal.style.display = 'none'
})

function renderCat(){
   
    const catObject = getSingleCatObject()
    
    memeModalInner.innerHTML = `
    <img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >
    `
    memeModal.style.display = 'flex'

}

function getSingleCatObject(){
    
    const catsArray = getMatchingCatsArray()
    
    if (catsArray.length === 1){
        return catsArray[0]
    }
    else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]

    }
    
}

function getMatchingCatsArray(e){

    const isGif = gifsOnlyOption.checked
    console.log(isGif)


    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
  

       const matchingCatsArray = catsData.filter(function(cat){
        if(isGif){
            return cat.emotionTags.includes(selectedEmotion) && cat.isGif
        }else{
            return cat.emotionTags.includes(selectedEmotion)
        }
        
    })
    return(matchingCatsArray)
    }
  
    
}
function highlightCheckedOption(e){

    const radios = document.getElementsByClassName('radio')
    
    for (let radio of radios){
        radio.classList.remove('highlight')
    }


    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}


function getEmotionsArray(cats){
const catArr = []


for(let item of cats){
   for(let emotion of item.emotionTags){
    if(!catArr.includes(emotion)){
        catArr.push(emotion)
    }
  
   }
}
return catArr

}


function renderEmotionRadio(cats){
    let emotions = getEmotionsArray(cats)
   let emotionList = ''
   for(let emotion of emotions){
     emotionList += `<div class="radio">
                         <label for="${emotion}">${emotion}</label>
                        <input
                        type="radio"
                        name="choice"
                        value="${emotion}"
                        id="${emotion}">
                        </div>`
   }
   emotionRadios.innerHTML = emotionList
}

renderEmotionRadio(catsData)




