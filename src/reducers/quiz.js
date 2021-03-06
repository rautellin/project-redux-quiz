import { createSlice } from '@reduxjs/toolkit'

const questions = [
  { id: 0, questionText: 'Who is this?', options: ['Good guy greg', 'Ermahgerd', 'Bad Luck Brian', 'Star Wars Kid'], image: './images/badluck.png', correctAnswerIndex: 2 },
  { id: 1, questionText: "This meme's background is usually blue and...", options: ['Orange', 'Red', 'Green', 'Yellow'], image: './images/pingvin.png', correctAnswerIndex: 1 },
  { id: 2, questionText: 'This cat is...', options: ['Angry', 'Annoyed', 'Grumpy', 'Crabby'], image: './images/cat.png', correctAnswerIndex: 2 },
  { id: 3, questionText: 'In this meme, Kermit is drinking...', options: ['Lemonade', 'Whiskey', 'Tea', 'Coffee'], image: './images/kermit.png', correctAnswerIndex: 2 },
  { id: 4, questionText: "This meme's captions typically end with the word...", options: ['Forever', 'Everywhere', 'Nobody', 'Beyond'], image: './images/toystory.png', correctAnswerIndex: 1 },
  { id: 5, questionText: 'What is the original name of this meme?', options: ['Fist bumb kid', 'Success kid', 'I hate sandcastles', 'Gonna mess you up'], image: './images/kid.png', correctAnswerIndex: 2 },
  { id: 6, questionText: 'This fist belongs to...', options: ['Arthur', 'Bart Simpson', 'Bob the builder', 'Binky Barnes'], image: './images/fist.png', correctAnswerIndex: 0 },
  { id: 7, questionText: 'Finish the meme: Is this...', options: ['alive', 'a pigeon', 'an insect', 'stupid'], image: './images/pigeon.png', correctAnswerIndex: 1 },
  { id: 8, questionText: 'Can you name this meme?', options: ['SRSLY?', 'O RLY?', 'O WLY?', 'BOY!'], image: './images/owl.png', correctAnswerIndex: 1 },
  { id: 9, questionText: "If you run into this girl, it's very likely to occur...", options: ['an accident', 'a catastrophe', 'a disaster', 'a tragedy'], image: './images/disaster.png', correctAnswerIndex: 2 }
]

const results = [
  { text: 'Not sure if the quiz was too easy of if you cheated.', image: './images/futurama.png' },
  { text: '"When you aced the quiz and your confidence skyrockets."', image: './images/pooh.png' },
  { text: '"When you thought you aced the quiz but still failed it."', image: './images/kanye.png' },
  { text: 'Have you been living under a rock?', image: './images/rock.png' }
]

const summary = {
  numberOfQuestions: null,
  correctAnswers: null,
  quote: null,
  image: null
}

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  disabled: true,
  optionDisabled: false,
  deciseconds: 100,
  timerStart: true,
  showSummary: false,
  results,
  summary
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    submitAnswer: (state, action) => {
      state.timerStart = false
      state.disabled = false
      state.optionDisabled = true
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.showSummary = true
      }

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },
    goToNextQuestion: (state) => {
      state.disabled = true
      state.optionDisabled = false
      state.deciseconds = 100
      state.timerStart = true
      state.currentQuestionIndex += 1
    },
    goToPreviousQuestion: (state) => {
      state.disabled = true
      state.optionDisabled = false
      state.timerStart = true
      state.deciseconds = 100
      state.currentQuestionIndex -= 1
    },
    restart: () => {
      return initialState
    },
    setTimer: (state) => {
      state.timerStart = false
    },
    countdowndeciseconds: (state) => {
      state.deciseconds -= 1
    },
    enableNextButton: (state) => {
      state.disabled = false
    },
    setSummary: (state, action) => {
      const { numberOfQuestions, correctAnswers } = action.payload
      state.summary.numberOfQuestions = numberOfQuestions
      state.summary.correctAnswers = correctAnswers

      if (correctAnswers > 8) {
        console.log('eight')
        state.summary.quote = state.results[0].text
        state.summary.image = state.results[0].image
      } else if (correctAnswers > 6) {
        console.log('six')
        state.summary.quote = state.results[1].text
        state.summary.image = state.results[1].image
      } else if (correctAnswers > 4) {
        console.log('four')
        state.summary.quote = state.results[2].text
        state.summary.image = state.results[2].image
      } else {
        console.log('under four')
        state.summary.quote = state.results[3].text
        state.summary.image = state.results[3].image
      }
    }
  }
})
