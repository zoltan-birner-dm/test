

$(document).ready(function () {

    var colorArray=["#019875","#1E8BC3","#D91E18","#D35400","#8E44AD","#C0392B"];
    var cardState;
    var currentQuestion=0;
    var qbank=new Array;
   
    loadDB('hun-en');
   
    function loadDB(dictype){
        if (dictype == 'hun-en') data = shuffleArray(hunen);
        if (dictype == 'en-hun') data = shuffleArray(enhun);
        if (dictype == 'local'){ 
            data = shuffleArray(JSON.parse(localStorage.getItem('difficult-dic')));
            if (JSON.parse(localStorage.getItem('difficult-dic')) == null) {
                localStorage.setItem('difficult-dic', '');
                data = [];
            }
        }
    
    
        for(i=0;i<data.length;i++){
            qbank[i]=[];
            qbank[i][0]=data[i].cardfront;
            qbank[i][1]=data[i].cardback;
           }//for
           beginActivity();
        }//loadDB
    
    
    /**
     * Randomise array
     * @param {*} array 
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }
   
    function beginActivity(){
     cardState=0;
     var color1=colorArray[Math.floor(Math.random()*colorArray.length)];
     $("#cardArea").empty();
     $("#cardArea").append('<div id="card1" class="card">' + qbank[currentQuestion][0] + '</div>');
     $("#cardArea").append('<div id="card2" class="card">' + qbank[currentQuestion][1] + '</div>');
     $("#card1").css("background-color",color1);
     $("#card2").css("background-color","#34495E");
     $("#card2").css("top","200px");
     $("#cardArea").on("click",function(){
      if(cardState!=1){
            cardState=1;
            //togglePosition();
            $("#card1").animate({top: "-=200"}, 150, function() {cardState=0;togglePosition();});
            $("#card2").animate({top: "-=200"}, 150, function() {togglePosition2();});
      }//if
     });//click function
     currentQuestion++;
     $("#buttonArea").empty();
     $("#buttonArea").append('<div id="nextButton">NEXT</div>');
     $("#nextButton").on("click",function(){
      if(currentQuestion<qbank.length){beginActivity();}
      else{displayFinalMessage();}
     });//click function
    }//beginactivity
   
    function togglePosition(){
     if($("#card1").position().top==-200){$("#card1").css("top","200px");};
    }//toggle
   
    function togglePosition2(){
     if($("#card2").position().top==-200){$("#card2").css("top","200px");};
    }//toggle2
   
    function displayFinalMessage(){
     $("#buttonArea").empty();
     $("#cardArea").empty();
     $("#cardArea").append('<div id="finalMessage">You have finished the activity.</div>');
    }//final message

   });

 
   function changeDic(dicname) {
    console.log(dicname);
    loadDB(dicname)
    }   