var question = document.querySelector('#question');
var wrapper = document.querySelector('#wrapper');
var answerBox = document.querySelector('#answers');
var score = document.querySelector('#score');
var timer = document.querySelector('#timer');
var startBtn = document.querySelector('#startBtn')
var index = 0;
var isTrue;
var time;

//timer function
function timerStart(){
    time = setInterval(function(){ 
        timer.textContent = parseInt(timer.textContent) - 1;

        //stop timer when it reaches zero
        if((parseInt(timer.textContent)) <= 0){
            timer.textContent = 0;
            stop();
            clear();
            displayScore();
        }
    }, 1000);
}

//stop the timer
function stop(){
    clearInterval(time);
};

// render the question and answers
function render(){
    question.textContent = questions[index].question;
    var answers = questions[index].answers;
    for(var i = 0; i < answers.length; i++){
        var p = document.createElement('p');
        p.textContent = answers[i];
        answerBox.appendChild(p);
    }
}

//clear the content
function clear(){
    question.textContent = '';
    answerBox.innerHTML = '';
}

//display your score
function displayScore(){
    //if final score is your high score, save it in local storage
    var finalScore = parseInt(score.textContent);
    var localScore = localStorage.getItem('highScore');
    var h1 = document.createElement('h1');
    h1.setAttribute('class', 'score');
    //if this is a new high score, save it to localStorage, and print out a congrats message
    if(localScore < finalScore){
        localStorage.setItem('highScore', finalScore);
        h1.textContent = `Congratulations! You've reached a new high score of ${finalScore} points!`
        wrapper.appendChild(h1);
    } else {
    // render your score 
    h1.textContent = `Your final score is: ${finalScore}`;
    wrapper.appendChild(h1);
    //render your high score
    var highScore = document.createElement('h2');
    highScore.textContent = `Your high score is: ${localScore}`;
    highScore.setAttribute('class', 'score')
    wrapper.appendChild(highScore);
    }
}

//when the start button is clicked
startBtn.addEventListener('click',function(){
    //get rid of intro screen
    document.querySelector('#intro').style.display = 'none';
    //start the timer
    timerStart();
    render();
})

//when answers are clicked
answerBox.addEventListener('mouseup', function(e){
    //detect whether the target is the correct answer
    var correct = e.target.textContent === questions[index].correct;
        //bring on the next question
    function nextQuestion(){
        //clear the page, increment the index, and render everything again
        if(index <= (questions.length - 1)){
            index++;   
            clear();
            render();
        }
        // if it is the end of the questions array, stop the timer
        if(index >= (questions.length - 1)){
            timer.textContent = 0;
            stop();
            clear();
            displayScore();
        }  
    }

    //if target is the correct answer, increment score
    if(correct){
        event.target.style.backgroundColor = "#5CDB95";
        score.textContent = parseInt(score.textContent) + 1;
        setTimeout(function(){
            nextQuestion();
        },500)
    //if target is not the correct answer, knock 10 seconds off the timer
    } else {
        timer.textContent = parseInt(timer.textContent) - 10;
        e.target.style.backgroundColor = "#DB675C";
        setTimeout(function(){
            nextQuestion();
        },500)
    }
    

})