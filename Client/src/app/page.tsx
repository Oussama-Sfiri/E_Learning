'use client'
import React, { useState } from 'react';
import Video from '@/components/Video';
import QuizData from '@/data/Quiz';
import QuizQuestion from '@/components/QuizQuestion';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<{ questionId: string; answer: string }>>(
    Array.from({ length: QuizData[0]?.questions.length }, () => ({ questionId: '', answer: '' }))
  );

  const handleNext = () => {
    const nextQuestionIndex = currentQuestion + 1;
    if (selectedAnswers[currentQuestion].answer!== '') {
      console.log('Question ID:', currentQuiz?.questions[currentQuestion]?.id);
      console.log('User Answer ID:', selectedAnswers[currentQuestion].answer);
    }

    nextQuestionIndex < QuizData[0]?.questions.length && setCurrentQuestion(nextQuestionIndex);
  };

  const handlePrevious = () => {
    const prevQuestionIndex = currentQuestion - 1;
    prevQuestionIndex >= 0 && setCurrentQuestion(prevQuestionIndex);
  };

  const handleSubmit = () => {
    console.log('All Selected Answers:', selectedAnswers);
  };

  const currentQuiz = QuizData[0];

  return (
    <div className='flex mt-20 justify-around max-w-screen-xl mx-auto p-4 md:py-8 bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800'>
      <Sidebar />
      <main className="flex-grow">
        {currentQuestion === 0 ? (
          <Video url={currentQuiz?.videos && currentQuiz.videos[0]?.url} />
        ) : (
          currentQuiz?.questions && (
            <QuizQuestion
              question={currentQuiz.questions[currentQuestion]?.text}
              answerOptions={currentQuiz.questions[currentQuestion]?.options || []}
              selectedAnswer={selectedAnswers[currentQuestion].answer}
              onRadioChange={(answer: string) => {
                const updatedAnswers = [...selectedAnswers];
                updatedAnswers[currentQuestion] = {
                  questionId: String(currentQuiz.questions[currentQuestion]?.id),
                  answer,
                };
                setSelectedAnswers(updatedAnswers);
              }}
              
            />
          )
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevious}
            className="w-[30%] py-3 bg-primary-600 rounded-lg"
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          {currentQuestion === QuizData[0]?.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="w-[30%] py-3 bg-primary-600 rounded-lg"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-[30%] py-3 bg-primary-600 rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
