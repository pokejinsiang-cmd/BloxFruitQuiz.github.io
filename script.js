// create a list to store all quiz questions
// [] - list
// {} - dictionary
const questionBank = [ 
    {
        question : "What is the most expensive fruit in blox fruit?",
        options : ["Dragon Eclipse (both dragon east and west)","Galaxy Empyrean Kitsune","Crimson Kitsune","Ember West Dragon"],
        answer : "Dragon Eclipse (both dragon east and west)"
    },

    {
        question : "What is the best fruit for sea event hunting?",
        options : ["Buddah","Tiger","Werewolf","Blizzard"],
        answer : "Blizzard"
    },

    {
        question : "What is the best fruit for grinding?",
        options : ["Trex","Mammoth","Shadow","Tiger"],
        answer : "Trex"
    },

    {
        question : "What is the best fighting style for PVP?",
        options : ["Dark step","Dragon Breath","Electric","Electric Claws"],
        answer : "Electric Claws"
    },
]

const questionLabel = document.getElementById("question")
const startBtn = document.getElementById("btn")
const optionBox = document.getElementById("optionBox")
const timerText = document.getElementById("timer")
const scoreLabel = document.getElementById("scoreLabel")
const feedbackLabel = document.getElementById("feedbackLabel")
const progressbarfill = document.getElementById("fill")

startBtn.addEventListener("click", StartQuiz)

let timer
let score = 0
let message = ""
let questionNum = 0

function StartQuiz()
{
    if(questionNum < questionBank.length)
    {
        startBtn.style.display = "none"
        const questionSet = questionBank[questionNum]
        questionLabel.textContent = questionSet.question

        // remove previous option button 
        optionBox.innerHTML = ""

        //reset timer 
        timerText.textContent = 15

        // reset feedback label
        feedbackLabel.textContent = ""

        // update progress bar
        progressbarfill.style.width = `${((questionNum + 1) / questionBank.length ) * 100}%` 
        
        // create 4 html buttons
        questionSet.options.forEach((item) => {
            const button = document.createElement("button")
            button.textContent = item
            button.classList.add("optionBtn")
            optionBox.appendChild(button)

            // apply on-click event listener to each and every option button
            button.addEventListener("click",()=> {
                DisableOptionButton()
                clearInterval(timer)
                CheckAnswer(item)       //item - the answer we selected
            })
        })

        // countdown starts
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1

            if(parseInt(timerText.textContent) === 0)
            {
                clearInterval(timer)
                DisableOptionButton()
                clearInterval(timer)
                CheckAnswer(null)
            }
        }, 1000)
    } else {
        EndQuiz();
    }
}


function DisableOptionButton()
{
    const allOptionButtons = document.querySelectorAll(".optionBtn")

    allOptionButtons.forEach(button => {
        button.disabled = true
    })
}

function CheckAnswer(item)
{
    const actualAns = questionBank[questionNum].answer

    if(item === actualAns)
    {
        score += 1 
        message = "That's correct! ☑️☑️☑️"
    } 
    
    else if (item === null)
    {
        message = "time's up, too slow ⏱️"
    }
    else
    {
        message = "That's incorrect❌❌❌"
    }

    feedbackLabel.textContent = message
    scoreLabel.textContent = `Score: ${score}`

    // hold for 3 seconds before it loads the next question
    setTimeout(() => {
        questionNum += 1
        StartQuiz()
    }, 3000)
}

function EndQuiz()
{
    clearInterval(timer)
    questionLabel.textContent = "Quiz ended! 👍"
    feedbackLabel.textContent = "Thank you for playing! wish you play again 😊"
    scoreLabel.textContent = `You scroed ${score} points.` 
    optionBox.style.display = "none"
    timerText.textContent = "👍"
}