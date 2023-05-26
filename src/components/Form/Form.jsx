import React from 'react'
import './Form.css'

const Form = ({data}) => {
  return (
    <div className='form'>
      {data.map((field, index) => {
          return <input key={index} onChange={(e) => e.target.value}  type={field.inputType} placeholder={field.title} name={field.title}/>
      })}
      
    </div>
  )
}

export default Form