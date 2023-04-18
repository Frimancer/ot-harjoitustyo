import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = (props) => {
    return (
        <div>
            {props.courses.map((c,i) => (
                <div key={i}>
                    <Header course={c.name} />
                    <Content parts={c.parts} />
                    <Total parts={c.parts} />
                </div>
            ))}
        </div>
    )
}

export default Course;