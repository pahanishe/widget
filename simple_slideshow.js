var slideshow =  function (){
    var container = document.getElementById('slideshow'),
        images = container.getElementsByTagName('img'),
        currentslide = 0,
        show = function(el){
            if(el){
                hideall();
                el.setAttribute('class','show');
            }

        },
        hideall = function(){
            for(i=0;i<images.length;i++){
                if(images[i]){
                    images[i].setAttribute('class','hidden');
                }
            }
        },

       player = function(){
           var slide,
               timer;
           if(currentslide < images.length ){
               slide = images[currentslide];
               show(slide);
               //timer = setTimeout(player(), 3000);
               currentslide = currentslide + 1;

           }else{
               currentslide = 0;
               show(slide);
              // setTimeout(player(), 3000);
           }
    };
    return setInterval(player,3000);

}();
