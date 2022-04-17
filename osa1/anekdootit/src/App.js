import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const len = anecdotes.length
  const [votes, setVote] = useState(Array(len).fill(0))
  const [rand, setRand] = useState(0)
  

  const VoteClick = () => {
    const arrCopy = [...votes]
    arrCopy[rand] += 1
    setVote(arrCopy)
  }

  const RandomNumber = max => {
    return Math.floor(Math.random() * max)
  }

  const RandClick = (len) => {
    let random = RandomNumber(len)
    setRand(random)
    setSelected(random)
  }

  return (
    <div>
      {anecdotes[selected]}
      <br></br>
      <Button handleClick={() => RandClick(len)} text="random anecdote" />
      <Button handleClick={() => VoteClick()} text="vote" />
      <p>has {votes[rand]} votes</p>
    </div>
  )
}

export default App