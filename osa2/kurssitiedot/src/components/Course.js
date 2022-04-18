const Total = ({parts}) => {
    const sum = parts.reduce((total, part) => total + part.exercises, 0)
    return (
      <>
        <p>Number of exercises {sum}</p>
      </>
    )
}
  
const Part = ({part}) => {
    return (
        <>
        <p>{part.name} {part.exercises}</p>
        </>
    )
}

const Content = ({parts}) => {
    return (
        <div>
        <ul>
            {parts.map(part =>
            <Part key={part.id} part={part} />
            )}
        </ul>
        </div>
    )
}

const Header = ({name}) => {
    return (
        <h1>
        <p>{name}</p>
        </h1>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} /> 
        </>
    )
}

export default Course