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
        "question": "white + red =",
        "answers": ['pink', 'green', 'silver', 'purple'],
        "correct": "pink"
    },
    {
        "question": "blue + yellow =",
        "answers": ['white', 'green', 'silver', 'purple'],
        "correct": "green"
    },
    {
        "question": "white + black =",
        "answers": ['brown', 'grey', 'silver', 'purple'],
        "correct": "grey"
    },
    {
        "question": "white + black =",
        "answers": ['brown', 'grey', 'silver', 'purple'],
        "correct": "grey"
    },
    {
        "question": "white + black =",
        "answers": ['brown', 'grey', 'silver', 'purple'],
        "correct": "grey"
    },
    {
        "question": "white + black =",
        "answers": ['brown', 'grey', 'silver', 'purple'],
        "correct": "grey"
    },
    {
        "question": "white + black =",
        "answers": ['brown', 'grey', 'silver', 'purple'],
        "correct": "grey"
    },
    {
        "question": "white + black =",
        "answers": ['brown', 'grey', 'silver', 'purple'],
        "correct": "grey"
    },
    {
        "question": "white + black =",
        "answers": ['brown', 'grey', 'silver', 'purple'],
        "correct": "grey"
    }
]

var question = document.querySelector('#question');
var wrapper = document.querySelector('#wrapper');
var answerBox = document.querySelector('#answers');
var score = document.querySelector('#score');
var timer = document.querySelector('#timer')
var index = 0;

// start the timer
if(confirm('are you ready?')){
    timeFunc;
    render();
}

//timer function
var timeFunc = setInterval(function(){ 
    timer.textContent = parseInt(timer.textContent) - 1;
    console.log(timer.textContent);
    console.log(typeof parseInt(timer.textContent));
}, 1000);

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

//stop the timer
function stop(){
    clearInterval(timeFunc);
}

//display your score
function displayScore(){
    var finalScore = score.textContent;
    var h3 = document.createElement('h1');
    h3.textContent = `Your final score is: ${finalScore}`;
    answerBox.appendChild(h3);
}

//stop the timer at zero
//if(!(parseInt(timer.textContent) <= 0)){
//     stop();
//     clear();
// }

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
        stop();
        clear();
        displayScore();
    }

})