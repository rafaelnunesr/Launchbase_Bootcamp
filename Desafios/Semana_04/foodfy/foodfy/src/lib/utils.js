module.exports = {
    date(timestamp){
        const date = new Date(timestamp)
        
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.splice(-2)
        const day = `0${date.getUTCDate()}`.splice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        }
    }
}