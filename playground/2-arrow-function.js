
const theEvent = {
    name: 'Birthday Party',
    printGuestList: function () {
        console.log(`Guest list for ${this.name}`);
    }
};
theEvent.printGuestList();


// Arrow functions DON'T bind their own 'this' value
const theEventArrowFunction = {
    name: 'Birthday Party',
    printGuestList: () => {
        console.log(`Guest list for ${this.name}`); //undefined
    }
};
theEventArrowFunction.printGuestList();


const theEventWithShortFunctionAndThis = {
    name: 'Birthday Party',
    //ES6 method definition syntax (the 'this' binding works OK)
    printGuestList() {
        console.log(`Guest list for ${this.name}`);
    }
};
theEventWithShortFunctionAndThis.printGuestList();


const theEvent2 = {
    name: 'Birthday Party',
    gestList: ['Nacho', 'Edu', 'Juan'],
    printGuestList() {
        console.log(`Guest list for ${this.name}`);

        // Aca ABAJO, no puedo acceder al this.name, porque al usar la function clasica (function()) TIENE SU PROPIO THIS BINDING.
        // JUSTAMENTE AHORA LO QUE SE QUIERE ES QUE PUEDA ACCEDER AL THIS BINDING DE SU PADRE (printGuestList()) que apunta a la prop name.
        // PARA SOLUCIONARLO HAY QUE PONER ESTA FUNCTION INTERNA COMO ARROW FUNCTION. 
        // Como el arrow function NO bindea su propio THIS en el contexto donde fueron creadas, al usar el this.name tenemos acceso al this del padre.
        
        // this.gestList.forEach(function (guest) {
        //     console.log(guest + 'is attending ' + this.name);
        // })

        this.gestList.forEach((guest) => { // (the 'this' binding works OK)
            console.log(guest + 'is attending ' + this.name);
        })
    }
};
theEvent2.printGuestList();