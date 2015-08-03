$(function(){

  $("#gameRules").hide();
  var gameRulesView = false;

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
