const Total = (props) => {
  const sumWithInitial = props.parts.reduce((accumulator, currentValue) => 
    accumulator + currentValue.exercises, 0
  );
  return (
    <div>
      <p style={{ fontWeight: 'bold'}}>Total of exercises { sumWithInitial }</p>
    </div>
  )
}

export default Total;
