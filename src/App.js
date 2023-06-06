import React , {useState,useEffect} from 'react';
import './App.css';
import Alert from './components/Alert'
import ExpensesForm  from './components/ExpensesForm';
import ExpensesList from './components/ExpensesList';

import { v4 as uuid} from 'uuid'
 
// const initialExpenses = [
//   {id : uuid(), charge : 'rent', amount : 1000},
//   {id : uuid(), charge : 'car' , amount : 800},
//   {id : uuid(), charge  :'credit', amount : 500}
// ]
const initialExpenses = localStorage.getItem('expenses')?JSON.parse(localStorage.getItem('expenses')):[]
function App() {

// ************ State Values*********************
  const [expenses , setExpenses] = useState(initialExpenses)
  const [charge , setCharge] = useState('')
  const [amount , setAmount] = useState('')
  const [alert , setAlert]  = useState({show:false})
  const [edit,setEdit] = useState(false)
  const [id,setId] = useState(0)

// *********** Functionality **************
const handleCharge = e =>{
  // console.log(`Charge : ${e.target.value}`)
  setCharge(e.target.value)
}
const handleAmount = e =>{
  // console.log(`Amount : ${e.target.value}`)
  setAmount(e.target.value)
}
const handleAlert = ({type,text})=>{
  setAlert({show :true,type,text})
  setTimeout(() => {
    setAlert({show:false})
  }, 3000);
}
const handleSubmit = e =>{
  e.preventDefault()
  if (charge !== '' && amount !== 0) {
    if (edit) {
      let expense = expenses.map(item =>{return item.id === id?{...item,charge,amount}:item} )
      setExpenses(expense)
      setEdit(false)
      handleAlert({type:'success',text:'item edited'})
    }else{
      const singleExpense ={id:uuid(),charge,amount}
      setExpenses([...expenses,singleExpense])
      handleAlert({type:'success',text:'The expense has been added sucessfully'})
      
    }
    setCharge('')
    setAmount('')
  }else{
    handleAlert({ type:'danger ', text :'Oops , Please fill the both inputfields'})
  }
}
 const handleDelete = (id)=>{
  // console.log(`Deleted ${id}`)
  const tempExpenses = expenses.filter(expense =>  expense.id !==id)
  setExpenses(tempExpenses)
  handleAlert({type:'danger',text:'item deleted'})
 }
 const handleEdit = (id) =>{
  // console.log(`Edited ${id}`)
  let expense = expenses.find(item => item.id === id)
  const {charge,amount} = expense
  setCharge(charge)
  setAmount(amount)
  setId(id)
  setEdit(true)

 }
 const handelDeleteItems =()=>{
  // console.log('The items have been deleted')
  setExpenses([])
  handleAlert({type:'danger',text:'items deleted'})
 }
 useEffect(() => {
  localStorage.setItem('expenses',JSON.stringify(expenses))
  
 },[expenses]);
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
   <Alert />
   <h1> Budget Calculator</h1>

   <main className='App'>

   <ExpensesForm charge={charge}
                 amount={amount} 
                 handleCharge={handleCharge} 
                 handleAmount={handleAmount}
                 handleSubmit = {handleSubmit}
                 edit ={edit}
                   />

   <ExpensesList expenses = {expenses}
                 handleDelete={handleDelete} 
                 handleEdit={handleEdit}
                 handelDeleteItems={handelDeleteItems} />
   </main>
   <h1>
    Total Budget :
    <span className='total'> ${expenses.reduce((previousValue, currentValue) => {
      return previousValue += parseInt(currentValue.amount)
    }, 0)}
    </span>
   </h1>
   </>
  );
}

export default App;
