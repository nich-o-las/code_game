/*
Initial HTML: 
    1. create an empty <ul> with an id of "answers".
    2. create a timer and set the value to 60.

Creating the Question objects:
    1. create an array of objects representing each question.
    2. within each object, create a key of "question" whose value is a question.
    3. within each object, create a key of "answers" whose value is an array of possible answers.
    4. within each object, create a key of "answer" whose value is the correct answer.

Rendering those Questions:
    p1. create an <h3> element.
    p2. create a textNode of object.question 
    p3. append textNode to h3.
    1. shuffle the array of answers. 
    2. loop through the shuffled array. 
    3. in the loop, create a <li> element.
    4. in the loop, create a text node and assign it to the item in the array.
    5. append the text node to the li element.
    6. append each li to the ul on the screen.

Game Logic:
    p1. create a setTimeout function that decreases the value of the timer by 1 each second.
    1. create an event listener for clicks on the ul.
    2. get the text content of the target.
    3. compare the text content of the target to object.correct and store the result in a variable.
    4. if the variable is equal to true, increment the score by 1.
    5. if the variable is equal to false, decrement the timer by 10 seconds.
    6. after iterating through each item of the questions array, display "game Over" and their score
    7. compare their score with the highScore variable in local storage, and, if the new score is higher, replace the local storage variable.
*/

var questions = [
    {
        "question": "blue + red =",
        "answers": ['brown', 'green', 'silver', 'purple'],
        "correct": "purple"
    },
    {
        "question": "yellow + red =",
        "answers": ['brown', 'orange', 'silver', 'purple'],
        "correct": "orange"
    },
    {
        "question": "white + red =",
        "answers": ['pink', 'green', 'silver', 'purple'],
        "correct": "pink"
    },
    {
        "question": "blue + yellow =",
        "answers": ['green', 'green', 'silver', 'purple'],
        "correct": "green"
    },
    {
        "question": "white + black =",
        "answers": ['brown', 'grey', 'silver', 'purple'],
        "correct": "grey"
    }
]

var question = document.querySelector('#question');
var ul = document.querySelector('#answers');
var score = document.querySelector('#score');
var timer = document.querySelector('#timer')

var index = 0;

if(confirm('are you ready?')){
    startTime();
    render();
}

function startTime(){
    setInterval(function(){ 
        timer.textContent = parseInt(timer.textContent) - 1;
    }, 1000);
};

function render(){
    question.textContent = questions[index].question;
    var answers = questions[index].answers;
    for(var i = 0; i < answers.length; i++){
        var li = document.createElement('li');
        li.textContent = answers[i];
        ul.appendChild(li);
    }
}

function clear(){
    question.textContent = questions[index].question;
    ul.innerHTML = '';
}

ul.addEventListener('click', function(e){
    var correct = e.target.textContent === questions[index].correct;

    console.log(correct);
    if(correct){
        score.textContent = parseInt(score.textContent) + 1;
    } else {
        timer.textContent = parseInt(timer.textContent) - 10;
    }

    index++;
    clear();
    render();
})