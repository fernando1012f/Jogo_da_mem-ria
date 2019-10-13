(function(){
        var acertos
        var images = [];
        var flippedcards = [];

        var modalgameover =document.querySelector('#modalgameover')
        var gameover =document.querySelector('#gameover')
        var imgacerto =document.querySelector("#imgacerto")

        for(var i=0; i<16;i++){
            var img = {
                src: `img/${i}.jpg`,
                id: i % 8
            }
            images.push(img);
        }

    startGame()
    function startGame (){
        acertos = 0;

        flippedcards = [];
        images = randomsort(images)

        var frontFaces = document.getElementsByClassName('front')
        var backFaces = document.getElementsByClassName('back')

        for(var i =0;i<16; i++){
            frontFaces[i].classList.remove("flipped","acerto");
            backFaces[i].classList.remove("flipped","acerto"); 

            var card = document.querySelector(`#card`+i);
            card.style.left = i% 8 ===0 ?5+'px': i % 8 *165+5+'px';
            card.style.top = i<8?5+'px':250 + 'px';
            card.addEventListener("click",flipCard,false);

            frontFaces[i].style.background = "url('"+images[i].src+"')";
            frontFaces[i].setAttribute("id",images[i].id);
        }

        modalgameover.style.zIndex = -2
        gameover.style.zIndex = -2
        modalgameover.removeEventListener("click",startGame,false)
        gameover.removeEventListener("click",startGame,false)
    }
    function randomsort(oldarray){
        var newarray = []

        while(newarray.length !== oldarray.length){
            var i = Math.floor(Math.random()*oldarray.length)

            if(newarray.indexOf(oldarray[i])< 0){
                newarray.push(oldarray[i])
            }
        }
        return newarray

    }

    function flipCard(){
        if(flippedcards.length < 2){
            var faces = this.getElementsByClassName("face")

            
            if (faces[0].classList.length > 2){
                return ;
            }
            faces[0].classList.toggle('flipped');
            faces[1].classList.toggle('flipped');

            flippedcards.push(this);
            if(flippedcards.length ===2){
                if(flippedcards[0].childNodes[3].id === flippedcards[1].childNodes[3].id){
                    flippedcards[0].childNodes[1].classList.toggle('acerto');
                    flippedcards[0].childNodes[3].classList.toggle('acerto');
                    flippedcards[1].childNodes[1].classList.toggle('acerto');
                    flippedcards[1].childNodes[3].classList.toggle('acerto');

                    acertocard();

                    acertos++;
                    flippedcards = []
                    
                    if(acertos === 8){
                        gameOver()
                    }
                }
            }
        } else {
            flippedcards[0].childNodes[1].classList.toggle('flipped');
            flippedcards[0].childNodes[3].classList.toggle('flipped');
            flippedcards[1].childNodes[1].classList.toggle('flipped');
            flippedcards[1].childNodes[3].classList.toggle('flipped');
        
            flippedcards = [];
        }


        
    }

    function gameOver(){
        modalgameover.style.zIndex = 10;
        gameover.style.zIndex = 10;
        gameover.addEventListener("click",function(){
            startGame();
        },false);
 
    }

    function acertocard(){
        imgacerto.style.zIndex = 1;
        imgacerto.style.top = 50 + "px";
        imgacerto.style.opacity = 0;
        setTimeout(function(){
            imgacerto.style.zIndex = -1;
            imgacerto.style.top = 150 + "px";
            imgacerto.style.opacity = 1;
        },1500);
    }

}());


