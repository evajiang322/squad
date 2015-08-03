$(function(){

  $("#gameRules").hide();
  var gameRulesView = false;
  var aboutGameView = true;

  $("#rules").click(function(){

    if(gameRulesView === true){
        $("#gameRules").fadeOut();
        $("#aboutGame").fadeIn();

      }
    else{
        $("#gameRules").fadeIn();
        $("#aboutGame").fadeOut();
    }
    gameRulesView = !gameRulesView;

  });
});
