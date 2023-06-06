import React from 'react'
import Item from './ExpensesItem'
import {MdDelete} from 'react-icons/md'

const ExpenseList = ({expenses,handleDelete,handleEdit,handelDeleteItems}) => {
  return (
    <>
    <ul className='list'>
     {expenses.map((expense) => {
        return <Item key ={expense.id} expense ={expense} handleDelete={handleDelete} handleEdit={handleEdit}/>
     })}
     </ul>
    {
        expenses.length > 0 && 
        <button className = 'btn' onClick={handelDeleteItems}>
        Clear Expenses
        <MdDelete className='btn-icon' />   
        </button>
    }
    </>
  )
}

export default ExpenseList
