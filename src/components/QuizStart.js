import React from 'react'
import { useDispatch } from 'react-redux'
import { quiz } from '../reducers/quiz'
import { PicContainer, Picture, StartQuizContainer, HeaderContainer } from '../lib/Containers'
import { Header, PicText, SubHeader } from '../lib/Text'
import { StartButton } from '../lib/Buttons'

export const QuizStart = () => {
  const dispatch = useDispatch()

  return (
    <>
      <StartQuizContainer>
        <HeaderContainer>
          <Header>What do you meme?</Header>
          <SubHeader>How much do you know about memes?</SubHeader>
          <StartButton onClick={() => dispatch(quiz.actions.beginQuiz())}>start</StartButton>
        </HeaderContainer>
        <PicContainer>
          <Picture src="./images/grumpy.png" alt="" />
          <PicText>Oh great, Now I&apos;m part of the design...</PicText>
        </PicContainer>
      </StartQuizContainer>
    </>
  )
}
