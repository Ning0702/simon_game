var buttonColors = [ "red", "blue", "green", "yellow" ];
var gamePattern = [];
var userClickedPattern = [];
var count = 0;
var level = 0;

//Step 7: start the game
// Game starts. Test whether this is the first time
if ( count === 0 )
{
    $( document ).keydown( function ()
        {
            $( "h1" ).text( "Level " + level );
            nextSequence();
        } ); 
}

function nextSequence ()
{
    //Step 8 - 6
    userClickedPattern = [];

    //Step 7 - 4,5
    level++;
    $( "h1" ).text( "Level " + level );

    // Step 2: Create random colors
    var randomNumber = Math.floor( Math.random() * 4 );
    var randomChosenColor = buttonColors[ randomNumber ];
    gamePattern.push( randomChosenColor );

    //Step 3: Show the sequence with animations and sounds
    $( "#" + randomChosenColor ).fadeOut( 100 ).fadeIn( 100 );
    playSound( randomChosenColor );

    //Step 4: detect which button is clicked
    $( ".btn" ).unbind("click").bind("click", function ()
    {
        var userChosenColor = this.id;
        userClickedPattern.push( userChosenColor );
        playSound( this.id );

         //Step8 - 2 
        checkAnswer( userClickedPattern.lastIndexOf( this.id ) );
    } );

    
};

//Step 5: Add sounds to button clicks
function playSound ( name )
{
    var audio = new Audio( "sounds/" + name + ".mp3" );
    audio.play();

    animatePress( name );
};

//Step 6: Add animations to user clicks
function animatePress (currentColor)
{
    $( "#" + currentColor ).addClass( "pressed" );

    //time delay and recover
    setTimeout( function ()
    {
        $( "#" + currentColor ).removeClass( "pressed" );
    }, 100 );
};

//Step 8: Check the user's answer
function checkAnswer (currentLevel)
{
    if ( gamePattern[ currentLevel ] === userClickedPattern[ currentLevel ] )
    {
        if ( currentLevel === gamePattern.length - 1 )
        {
            setTimeout( nextSequence(), 1000 );
        };
    } else
    {
        new Audio( "sounds/wrong.mp3" ).play();
        $( "body" ).addClass( "game-over" );
        setTimeout( function ()
        {
            $( "body" ).removeClass( "game-over" );
        }, 200 );
        $( "h1" ).text( "Game Over, Press Any Key to Restart" );
        startOver();
    };
};

function startOver ()
{
    level = 0;
    gamePattern = [];
};
