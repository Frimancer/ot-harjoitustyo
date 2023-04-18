import { useState } from 'react';

const Button = (props) => {
  console.log(props)
  return (<button onClick={props.onClick}>{props.name}</button>);
}

const StatisticLine = (props) => {
  return (<tr><td>{props.text}:</td><td>{props.value}</td></tr>)
}

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const calcAvg = () => {
    return (good - bad) / (good + neutral + bad);
  }

  const calcPercentage = () => {
    return (good / (good + neutral + bad) * 100).toString() + "%";
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good + neutral + bad}/>
          <StatisticLine text="average" value={calcAvg()}/>
          <StatisticLine text="positive" value={calcPercentage()}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name={"good"} onClick={() => setGood(good + 1)}/>
      <Button name={"neutral"} onClick={() => setNeutral(neutral + 1)}/>
      <Button name={"bad"} onClick={() => setBad(bad + 1)}/>

      <h1>Statistics</h1>

      <div>
        {(good > 0|| neutral > 0 || bad > 0) ? 
        <Statistics good={good} neutral={neutral} bad={bad}/>
        : <p>No feedback given</p>
        }
      </div>
    </div>
  )
}

export default App