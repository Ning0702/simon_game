var buttonColors = [ "red", "blue", "green", "yellow" ];
var gamePattern = [];
var userClickedPattern = [];
var count = 0;
var level = 0;
var click = 0;

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
    console.log( "userClickedPattern in nextSequence " + userClickedPattern );

    //Step 7 - 4,5
    level++;
    $( "h1" ).text( "Level " + level );
    console.log( "1" );

    // Step 2: Create random colors
    var randomNumber = Math.floor( Math.random() * 4 );
    var randomChosenColor = buttonColors[ randomNumber ];
    gamePattern.push( randomChosenColor );
    console.log( "gamePattern " + gamePattern );
    // console.log( "2" );

    //Step 3: Show the sequence with animations and sounds
    $( "#" + randomChosenColor ).fadeOut( 100 ).fadeIn( 100 );
    playSound( randomChosenColor );
    // console.log( "3" );

    //Step 4: detect which button is clicked
    $( ".btn" ).unbind("click").bind("click", function ()
    {
        console.log("This is the " + (++click) + " click." );
        console.log( "4" );
        var userChosenColor = this.id;
        userClickedPattern.push( userChosenColor );
        console.log( "userClickedPattern1 " + userClickedPattern );
        playSound( this.id );
        console.log( "5" );

         //Step8 - 2 
        // console.log( "index " + userClickedPattern.indexOf( this.id ) );
        checkAnswer( userClickedPattern.lastIndexOf( this.id ) );
        console.log( "6----------------" );
    } );

    
};

//Step 5: Add sounds to button clicks
function playSound ( name )
{
    var audio = new Audio( "sounds/" + name + ".mp3" );
    audio.play();

    animatePress( name );
    // console.log( "7" );
};

//Step 6: Add animations to user clicks
function animatePress (currentColor)
{
    // console.log( "8" );
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
    console.log( "9" );
    console.log( "in checkAnswer " + currentLevel );
    console.log( "gamePattern in checkAnswer: " + gamePattern );
    console.log( "userClickedPattern in checkAnswer: " + userClickedPattern );
    console.log( "gamePattern[ currentLevel ]: " + gamePattern[ currentLevel ] );
    console.log( "userClickedPattern[ currentLevel ]: " + userClickedPattern[ currentLevel ] );
    if ( gamePattern[ currentLevel ] === userClickedPattern[ currentLevel ] )
    {
        console.log( "success" );
        if ( currentLevel === gamePattern.length - 1 )
        {
            console.log( "time delay 1000, restart" );
            setTimeout( nextSequence(), 1000 );
        };
    } else
    {
        console.log( "wrong" );
        new Audio( "sounds/wrong.mp3" ).play();
        $( "body" ).addClass( "game-over" );
        setTimeout( function ()
        {
            $( "body" ).removeClass( "game-over" );
        }, 200 );
        $( "h1" ).text( "Game Over, Press Any Key to Restart" );
        startOver();
    };
    console.log( "10" );
}

function startOver ()
{
    level = 0;
    gamePattern = [];
}
