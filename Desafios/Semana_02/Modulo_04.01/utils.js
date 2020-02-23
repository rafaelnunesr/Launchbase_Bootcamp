module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birth = new Date(timestamp)

        let age = today.getFullYear() - birth.getFullYear()
        const month = today.getMonth - birth.getMonth()

        if(month < 0 || month == 0 && today.getDate() < birth.getDate()){
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
    }

}