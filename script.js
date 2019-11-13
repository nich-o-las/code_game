var questions = [
    {
        "question": "What tag do you use to reference an external CSS stylesheet?",
        "answers": ['<link>', '<style>', '<css>', '<p>'],
        "correct": "<link>"
    },
    {
        "question": "What tag do you use to reference an external JavaScript file?",
        "answers": ['<style>', '<css>', '<script>', '<js>'],
        "correct": "<script>"
    },
    {
        "question": "Which of these is NOT a way to reference colors?",
        "answers": ['rbga value', 'hex code', 'by name', 'by emotion evoked'],
        "correct": "by emotion evoked"
    },
    {
        "question": "How do you add a value to the end of a JavaScript array?",
        "answers": ['.add()', '.push()', '.pop()', '.end()'],
        "correct": ".push()"
    },
    {
        "question": "How many columns are in the Bootstrap grid?",
        "answers": ['6', '3', '12', '10'],
        "correct": "12"
    },
    {
        "question": "Which command uploads your changes to GitHub?",
        "answers": ['git pull', 'git status', 'git push', 'git commit'],
        "correct": "git push"
    },
    {
        "question": "How do you reference the JQuery library in JavaScript?",
        "answers": ['#', '&', '@', '$'],
        "correct": "$"
    },
    {
        "question": "How do you update text in vanilla JavaScript?",
        "answers": ['item.textContent', 'item.content', 'item.words', 'item.innerText'],
        "correct": "item.textContent"
    },
    {
        "question": '"Local" JavaScript variables are accessible where?',
        "answers": ['Anywhere', 'In the function where they are declared', 'In their parent functions', 'Only in "for" loops'],
        "correct": "In the function where they are declared"
    },
    {
        "question": 'What does "HTML" stand for?',
        "answers": ['Holy Turkey Monster Lizard', 'HiT Me, Linda', 'HyperText Markup Language', 'How The Marbles Land'],
        "correct": "HyperText Markup Language"
    },
    {
        "question": 'What does DOM stand for?',
        "answers": ['Do Ow to Me', 'Document Object Model', "Dunkin' Or Maybe (somewhere else)", 'Donkly Onkly Monkly'],
        "correct": "Document Object Model"
    }
]

var question = document.querySelector('#question');
var wrapper = document.querySelector('#wrapper');
var answerBox = document.querySelector('#answers');
var score = document.querySelector('#score');
var timer = document.querySelector('#timer');
var startBtn = document.querySelector('#startBtn')
var index = 0;
var isTrue;
var time;


//stop the timer
function stop(){
    clearInterval(time);
};

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
    var h3 = document.createElement('h1');
    h3.setAttribute('class', 'score');
    //if this is a new high score, save it to localStorage, and print out a congrats message
    if(localScore < finalScore){
        localStorage.setItem('highScore', finalScore);
        h3.textContent = `Congratulations! You've reached a new high score of ${finalScore} points!`
        wrapper.appendChild(h3);
    } else {
    // render your score 
    h3.textContent = `Your final score is: ${finalScore}`;
    wrapper.appendChild(h3);
    //render your high score
    var highScore = document.createElement('h2');
    highScore.textContent = `Your high score is: ${localScore}`;
    h3.setAttribute('class', 'score');
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
answerBox.addEventListener('click', function(e){
    //detect whether the target is the correct answer
    var correct = e.target.textContent === questions[index].correct;

    //if target is the correct answer, increment score
    if(correct){
        score.textContent = parseInt(score.textContent) + 1;
    //if target is not the correct answer, knock 10 seconds off the timer
    } else {
        timer.textContent = parseInt(timer.textContent) - 10;
    }
    // if it is not the end of the questions array, increment the index
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

})