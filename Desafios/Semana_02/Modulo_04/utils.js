module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birth = new Date(timestamp)

        let age = today.getUTCFullYear() - birth.getUTCFullYear()
        const month = today.getMonth - birth.getUTCMonth()

        if(month < 0 || month == 0 && today.getUTCDate() < birth.getUTCDate()){
            age = age - 1
        }
        return age
    },
    education: function(level){
        let ed = ''
        switch (level){
            case 'secondary_education':
                ed = 'Ensino Médio Completo'
                break

            case 'graduated':
                ed = 'Ensino Superior Completo'
                break

            case 'post_graduated':
                ed = 'Mestrado'
                break

            case 'doctorate':
                ed = 'Doutorado'
                break
            
            default:
                ed = 'Não informado'
                break
        }

        return ed
    },
    class_t: function(class_type){
        let type = ''
        switch (class_type){
            case 'presential':
                type = 'Presencial'
                break

            case 'ead':
                type = 'EAD'
                break

            case 'presential_ead':
                type = 'Presencial / EAD'
                break

            default:
                type = 'Não informado'
        }
        return type
    },
    date: function(timestamp){
        const date = new Date (timestamp)

        const year = date.getUTCFullYear()

        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    },
    school: function(school_level){
        let level = ''

        switch (school_level){
            case '0':
                level =  'Berçário/Pré-Escola'
                break
            
            case '1':
                level =  '1 Ano Ensino Infantil'
                break

            case '2':
                level =  '2 Ano Ensino Infantil'
                break

            case '3':
                level =  '3 Ano Ensino Infantil'
                break
            
            case '4':
                level =  '4 Ano Ensino Infantil'
                break

            case '5':
                level =  '5 Ano Ensino Fundamental'
                break

            case '6':
                level =  '6 Ano Ensino Fundamental'
                break
            
            case '7':
                level =  '7 Ano Ensino Fundamental'
                break

            case '8':
                level =  '8 Ano Ensino Fundamental'
                break

            case '9':
                level =  '1 Ano Ensino Médio'
                break
            
            case '10':
                level =  '2 Ano Ensino Médio'
                break

            case '11':
                level =  '3 Ano Ensino Médio'
                break

            case '12':
                level =  'Ensino Superior (Cursando)'
                break

            case '13':
                level =  'Ensino Superior (Completo)'
                break
            
            default:
                level = 'Not defined'
                break
        }

        return level
    }

}