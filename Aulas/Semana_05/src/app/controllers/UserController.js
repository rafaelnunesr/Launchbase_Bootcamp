class Person {
    constructor(name){
        this.name = name
    }

    getName() {
        return this.name
    }

}

class Dev extends Person {
    getName() {
        return 'outra coisa'
    }
}

const dev = new Dev("rafael")
console.log(dev.getName())