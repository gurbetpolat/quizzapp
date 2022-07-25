function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer
}


Question.prototype.checkAnswer = function (answer) {
    return this.answer === answer;
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;

}

Quiz.prototype.getQuestion = function () {

    return this.questions[this.questionIndex];
}



Quiz.prototype.isFinish = function () {
    return this.questions.length === this.questionIndex;
}


Quiz.prototype.guess = function (answer) {
    var question = this.getQuestion();

    if (question.checkAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

var q1 = new Question("Kalbim senden senden vazgeçmeyecek...", ["Emine", "Bengü", "Model","Kıraç"], "Kıraç");
var q2 = new Question("Seni seni bir tek seni en çok seniii...", ["Emre", "Sevgi", "Polat"], "Emre");
var q3 = new Question("Senin kollarında başlayan sabahlaraa...", ["Edis", "DKTT"], "DKTT");
var q4 = new Question("beni unutmaaaaaaaaaaaaaaaaaaaaaaaaa...", ["Deniz", "Sevgi", "Emre"], "Emre");
var q5 = new Question("Sevdim seni bir kereee başkasını sevemem...", ["Duman", "Teoman", "Leyla the Band","Karam"], "Teoman");

var questions = [q1, q2, q3, q4, q5];


var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
    } else {

        var question = quiz.getQuestion();
        var choices = question.choices;

        document.querySelector("#question").textContent = question.text;

        for (var i = 0; i < choices.length; i++) {
            var element = document.querySelector("#choice" + i);
            console.log(question);
            element.innerHTML = choices[i];
         
            guess("btn" + i, choices[i]);
        }


    showProgress();

        let buttons = document.querySelectorAll(".secenek")
        buttons.forEach((el) => {
            console.log(el.innerHTML.trim());
            if (el.innerHTML.trim() == "empty") {
                console.log(el.parentElement);
                el.parentElement.style.display = "none"
            }
        })
    }


}

function guess(id, guess) {
    var btn = document.getElementById(id);
    btn.onclick = function () {
        quiz.guess(guess);
        loadQuestion();

    }

}


function showScore() {
      var html =`<h2>Score</h2><h4>${quiz.score}</h4>`;
   document.querySelector(".card-body").innerHTML=html;
}

function showProgress(){
    var totalQuestion=quiz.questions.length;
    var questionNumber=quiz.questionIndex+1;

    document.querySelector("#progress").innerHTML
    ="Soru "+ questionNumber + "  / " + totalQuestion;
}