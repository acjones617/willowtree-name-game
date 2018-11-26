import React from 'react';
import styles from './Question.css';

function Question(props) {
  const employee = props.employee;
  let question;
  if (employee) {
    if (props.showFace) {
      question = (
        <div>
        <span>Who is </span>
          <img className={styles.questionImg}
            src={employee.headshot.url}
            alt={employee.headshot.alt}/>
        <span>?</span>
        </div>
      );
    } else {
      question = `Who is ${employee.firstName} ${employee.lastName}?`
    }
    return <h1 className={styles.question}>{question}</h1>
  }
}

export default Question;