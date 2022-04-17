import { useState } from 'react'

const StatisticLine = ({text, value, text2}) => (
  <>
    <p>{text} {value}{text2}</p>
  </>
)

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  if (all > 0) {
    return (
      <>
        <table>
          <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(good - bad) / all}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{(good / all) * 100}%</td>
          </tr>
          </tbody>
        </table>
      </>
    )
  }
  else {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App