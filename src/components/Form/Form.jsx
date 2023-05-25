import React from 'react'
import './Form.css'

const Form = (props) => {
  return (
    <div className='form'>
      {props.data.map((field) => {
          return <input key={field.isMandatory} type={field.inputType} placeholder={field.title} name={field.title}/>
      })}
      
    </div>
  )
}

export default Form