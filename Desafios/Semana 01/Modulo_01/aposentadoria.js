const nome = 'Sales'
const sexo = 'M'
const idade = 65
const contribuicao = 30

/*
O tempo de contribuição mínimo para homens é de 35 anos e, para mulheres, 30 anos

Utilizando a regra 85-95, a soma da idade com o tempo de contribuição do homem precisa ser de no mínimo 95 anos, enquanto a mulher precisa ter no mínimo 85 anos na soma
*/

const tempo_contribuicao = idade + contribuicao

if (sexo === 'M' && tempo_contribuicao >= 95){
    console.log(`${nome}, você pode ser aposentar!`)
}else if (sexo === 'F' && tempo_contribuicao >= 85)
{
    console.log(`${nome}, você pode ser aposentar!`)
} else {
    console.log(`${nome}, você ainda não pode ser aposentar!`)
}

