
//Callback Async
setTimeout(() => {
    console.log('Two Seconds are up');
}, 2000);

//Callback Sync .filter((...))
const names = ['pepe', 'pepePepon'];
const shortNames = names.filter(name => name.length <= 4);

// Custom function with Async callback
//Quiero que este codigo se ejecute cuando la funcion setTimeoput que es async, termine. 
const geoCode = (location, callback) => {

    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        };

        callback(data);

    }, 2000);

};

geoCode('Buenos aires', (data) => {
    console.log(data);
});


//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

// const add = (num1, num2, callback) =>{
//     setTimeout(() => {
//         const result = +num1 + +num2;
//         callback(result);
//     }, 2000);
// };

// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })
