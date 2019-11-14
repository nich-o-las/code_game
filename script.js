var question = document.querySelector('#question');
var wrapper = document.querySelector('#wrapper');
var answerBox = document.querySelector('#answers');
var score = document.querySelector('#score');
var timer = document.querySelector('#timer');
var startBtn = document.querySelector('#startBtn')
var index = 0;
var isTrue;
var time;
var running;

//timer function
function timerStart(){
    time = setInterval(function(){ 
        timer.textContent = parseInt(timer.textContent) - 1;
        running = true;
        //stop timer when it reaches zero
        if((parseInt(timer.textContent)) <= 0){
            running = false;
            timer.textContent = 0;
            stop();
            setTimeout(function(){
                clear();
                displayScore();
            },50)
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
    var localName = localStorage.getItem('name');
    var h1 = document.createElement('h1');
    var input = document.createElement('input');
    var submitBtn = document.createElement('div');
    h1.setAttribute('class', 'score');
    submitBtn.setAttribute('class', 'btn');
    submitBtn.setAttribute('id', 'submitBtn');
    input.setAttribute('placeholder', 'your initials here')
    submitBtn.textContent = "submit"
    input.setAttribute('type', 'text');
    //if this is a new high score, save it to localStorage, and print out a congrats message
    if(localScore < finalScore){       
        h1.textContent = `Congratulations! You've reached a new high score of ${finalScore} points!`
        wrapper.appendChild(h1);
        wrapper.appendChild(input);
        wrapper.appendChild(submitBtn);
    } else {
    // render your score 
    h1.textContent = `Your final score is: ${finalScore}`;
    wrapper.appendChild(h1);
    //render your high score
    var highScore = document.createElement('h2');
    highScore.textContent = `The high score is: ${localName} with ${localScore}`;
    highScore.setAttribute('class', 'score')
    wrapper.appendChild(highScore);
    }
    //update local storage when submit is clicked
    submitBtn.addEventListener('click',function(){
        var name = input.value;
        localStorage.setItem('name', name);
        localStorage.setItem('highScore', finalScore);
        submitBtn.style.backgroundColor = "#5CDB95";
        setTimeout(function(){
            location.reload();
        },500)
    });
}

//when the start button is clicked
startBtn.addEventListener('click',function(){
    //get rid of intro screen
    document.querySelector('#intro').style.display = 'none';
    //start the timer
    timerStart();
    render();
})

//bring on the next question
function nextQuestion(){
    //clear the page, increment the index, and render everything again
    if((index <= (questions.length - 1)) && running){
        index++;   
        clear();
        render();
    }
    // if it is the end of the questions array, stop the timer
    if(index >= (questions.length - 1)){
        stop();
        clear();
        displayScore();
    }  
}

//when answers are clicked
answerBox.addEventListener('mouseup', function(e){
    //detect whether the target is the correct answer
    var correct = e.target.textContent === questions[index].correct;

    //if target is the correct answer, increment score
    if(correct){
        event.target.style.backgroundColor = "#5CDB95";
        score.textContent = parseInt(score.textContent) + 1;
        setTimeout(function(){
            clear();
            nextQuestion();
        },500)
    //if target is not the correct answer, knock 10 seconds off the timer
    } else {
        timer.textContent = parseInt(timer.textContent) - 10;
        e.target.style.backgroundColor = "#DB675C";
        setTimeout(function(){
            clear();
            nextQuestion();
        },500)
    }
})