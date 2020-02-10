const user = {
    name: 'Mariana',
    transactions: [],
    balance: 0
}

function calcActualBalance (value, type){
    if (type === 'credit'){
        user.balance += value
    }
    else if (type === 'debit'){
        user.balance -= value
    }
}

function createTransaction (transaction){
    user.transactions.push(transaction)
    calcActualBalance(transaction.value, transaction.type)
}

function getHigherTransactionByType(type){
    let higher_transaction = {
        type: '', 
        value: 0
    }

    higher_transaction.type = type

    for (let transaction of user.transactions){
        if (transaction.type === type && transaction.value > higher_transaction.value){
            higher_transaction.value = transaction.value
        }
    }
    console.log(higher_transaction)
}

function getAverageTransactionValue(){
    let average_value_transactions = 0
    let total = 0
    let transactions_count = 0

    for (transaction of user.transactions){
        total += transaction.value
        transactions_count += 1
    }

    average_value_transactions = total / transactions_count

    console.log(average_value_transactions)
}

function getTransactionsCount(){
    transactions = {
        credit: 0,
        debit: 0
    }

    for (transaction of user.transactions){
        if (transaction.type === 'credit'){
            transactions.credit += 1
        }
        else if (transaction.type === 'debit'){
            transactions.debit += 1
        }
    }

    console.log(transactions)
}

createTransaction({ type: 'credit', value: 50 })
createTransaction({ type: 'credit', value: 120 })
createTransaction({ type: 'debit', value: 80 })
createTransaction({ type: 'debit', value: 30 })

console.log(user.balance) // 60

getHigherTransactionByType('credit') // { type: 'credit', value: 120 }
getHigherTransactionByType('debit') // { type: 'debit', value: 80 }

getAverageTransactionValue() // 70

getTransactionsCount() // { credit: 2, debit: 2 }