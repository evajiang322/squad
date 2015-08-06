

$(function(){

  $("#gameRules").hide();
  $("#aboutGame").hide();
  var gameRulesView = false;
  var aboutGameView = false;

  $("#rules").click(function(){

    if(gameRulesView === true && aboutGameView === true){
        closeAll();
      }
    //When game rules are opened and about is not
    else if(!gameRulesView && aboutGameView){
        openRules();
    }

    else if(!gameRulesView && !aboutGameView)
    {
      openRules();
    }
    else {
      closeAll();
    }

  });
  $('#sup').click(function() {
      window.location.href = 'game';
      return false;
  });
  //if you clicked the about tag
  $("#aboutTheGame").click(function(){

    //When both are open and you clicked the tag
    if(gameRulesView === true && aboutGameView === true){
        closeAll();
      }
    //When game rules are opened and about is not
    else if(gameRulesView && !aboutGameView){
        openAbout();
    }

    else if(!gameRulesView && !aboutGameView)
    {
      openAbout();
    }
    else {
      closeAll();
    }

  });

function closeAll(){
  $("#gameRules").fadeOut();
  gameRulesView = false;
  $("#aboutGame").fadeOut();
  aboutGameView = false;

    $("h2").css('margin-left','300px');
}

function openRules(){
  $("#gameRules").fadeIn();
  gameRulesView = true;
  $("#aboutGame").fadeOut();
  aboutGameView = false;


    $("h2").css('margin-left','2px');
}

function openAbout(){
  $("#gameRules").fadeOut();
  gameRulesView = false;
  $("#aboutGame").fadeIn();
  aboutGameView = true;

    $("h2").css('margin-left','2px');
}


});
