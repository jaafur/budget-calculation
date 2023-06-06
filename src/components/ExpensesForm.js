import React from 'react'
import {MdSend} from 'react-icons/md'
import { icons } from 'react-icons'

const ExpenseForm = ({charge,amount,handleCharge,handleAmount,handleSubmit,edit}) => {
  return (
    <form onSubmit={handleSubmit}>
    <div className='form-center'>
        <div className='form-group'>
            <label htmlFor = 'payment'>Payment</label>
            <input 
            type='text' 
            id='payment' 
            className='form-control'
             name='payment' 
             placeholder='e.g. Rent'
             value={charge}
             onChange={handleCharge}
             />
            
        </div>

        <div className='form-group'>
            <label htmlFor = 'amount'>Amount</label>
            <input 
            type='number' 
            id='amount' 
            className='form-control'
             name='amount' 
             placeholder='e.g. 100'
            value={amount}
            onChange = {handleAmount}
            />
        </div>

        </div>
      <button type= 'submit' className='btn'>
        {edit?'edit':'submit'}
        <MdSend className='btn-icon'/>
      </button>
    </form>
  )
}

export default ExpenseForm
