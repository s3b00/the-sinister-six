class Car {
    #brand
    #model
    #yearOfManufacturing
    #maxSpeed
    #maxFuelVolume
    #fuelConsumption
    #currentFuelVolume = 0
    #isStarted = false
    #mileage = 0

    get brand() { return this.#brand}
    set brand(value) {
        if (typeof value !== 'string') throw new Error('Неверный тип')
        if (value.length >= 1 && value.length <= 50) 
            this.#brand = value
        else throw new Error('Невалидная строка')
    }

    get model() { return this.#model}
    set model(value) { 
        if (typeof value !== 'string') throw new Error('Неверный тип')
        if (value.length >= 1 && value.length <= 50) 
            this.#model = value
        else throw new Error('Невалидная строка')
    }

    get yearOfManufacturing() { return this.#yearOfManufacturing }
    set yearOfManufacturing(value) { 
        if (typeof value !== 'number') throw new Error('Неверный тип')
        if (value >= 1900 && value <= new Date().getFullYear()) 
            this.#yearOfManufacturing = value
        else throw new Error('Невалидный год')
    }

    get maxSpeed() { return this.#maxSpeed }
    set maxSpeed(value) { 
        if (typeof value !== 'number') throw new Error('Неверный тип')
        if (value >= 100 && value < 300) 
            this.#maxSpeed = value
        else throw new Error('Невалидная скорость')
    }

    get maxFuelVolume() { return this.#maxFuelVolume }
    set maxFuelVolume(value) { 
        if (typeof value !== 'number') throw new Error('Неверный тип')
        if (value >= 5 && value < 20) 
            this.#maxFuelVolume = value
        else throw new Error('Невалидное число')
    }

    get fuelConsumption() { return this.#fuelConsumption }
    set fuelConsumption(value) { 
        if (typeof value !== 'number') throw new Error('Неверный тип')
        if (value >= 0) 
            this.#fuelConsumption = value
        else throw new Error('Невалидное число')
    }

    get currentFuelVolume() { return this.#currentFuelVolume }
    get isStarted() { return this.#isStarted }
    get mileage() { return this.#mileage }


    start() {
        if (this.#isStarted) throw new Error('Машина уже заведена')
        this.#isStarted = true
    }

    shutDownEngine() {
        if (!this.#isStarted) throw new Error('Машина ещё не заведена')
        this.#isStarted = false
    }

    fillUpGasTank(liters) {
        if (typeof liters !== 'number' || isNaN(liters)) throw new Error('Неверное количество топлива для заправки')
        if (liters < 1) throw new Error('Неверное количество топлива для заправки')
        if (this.#currentFuelVolume + liters > this.#maxFuelVolume) throw new Error('Топливный бак переполнен')
        
        this.#currentFuelVolume += liters
    }

    drive(speed, hours) {
        if (typeof speed !== 'number' || isNaN(speed)) throw new Error('Неверная скорость')
        if (speed < 1) throw new Error('Неверная скорость')
        if (typeof hours !== 'number' || isNaN(hours)) throw new Error('Неверное количество часов')
        if (hours < 1) throw new Error('Неверное количество часов')
        
        if (speed > this.#maxSpeed) throw new Error('Машина не может ехать так быстро')
        if (!this.#isStarted) throw new Error('Машина должна быть заведена, чтобы ехать')

        let S = speed * hours
        let Consumption = S / 100 * this.#fuelConsumption

        if (Consumption > this.#currentFuelVolume) throw new Error('Недостаточно топлива')
        this.#currentFuelVolume -= Consumption
        this.#mileage += S
    }
}

module.exports = Car;