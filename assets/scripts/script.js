// Wait for the DOM to finish loading before running the agme
//Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');

    prevButton.addEventListener("click", function() {
        prevQuestion();
    })

    nextButton.addEventListener("click", function() {
        nextQuestion();
    })

    submitButton.addEventListener("click", function() {
        submitQuestion();
    })

    let currentQuestion = 0;
    const questions = document.querySelectorAll('.question');

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.remove('active');
            if (i === index) {
                question.classList.add('active');
            }
        });
    }

    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
            console.log(questions[currentQuestion]);
            console.log(currentQuestion);
        }
        prevButton.disabled = currentQuestion === 0;
        if (currentQuestion === questions.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
    }

    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
        prevButton.disabled = currentQuestion === 0;
        if (currentQuestion < questions.length - 1) {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function submitQuestion() {
        carbonFootprintCalculator();
    }
})


/**
 * Main CarbonFootprint Calculation function
 */
function carbonFootprintCalculator() {
    
    // Collect form values
    let houseSize = document.querySelector('input[name="houseSize"]:checked').value;
    let heatingType = document.querySelector('input[name="heatingType"]:checked').value;
    let cookingGas = document.querySelector('input[name="cookingGas"]:checked').value;

    // estimate yearly milage
    let userFrequency = document.querySelector('input[name="driving_frequency"]:checked').value;
    let mileage = calculateYearlyMileage(userFrequency);
    console.log("Estimated yearly mileage:", mileage);

    //let shortFlights = parseFloat(document.querySelector('input[name="shortFlights"]').value) || 0;
    let userShortFlights = document.querySelector('input[name="short_flights"]:checked').value;
    let shortFlights = estimateShortFlights(userShortFlights);
    console.log("Estimated number of short flights:", shortFlights);

    // let longFlights = parseFloat(document.querySelector('input[name="longFlights"]').value) || 0;
    let userLongFlights = document.querySelector('input[name="short_flights"]:checked').value;
    let longFlights = estimateShortFlights(userLongFlights);
    console.log("Estimated number of short flights:", longFlights);

    let electricCar = document.querySelector('input[name="electricCar"]:checked').value;
    let recycleAtHome = document.querySelector('input[name="recycleAtHome"]:checked').value;
    
    // Electric Bill Estimate
    let electricBill = 0;
    if (houseSize === "small") {
        electricBill = 75;
    } else if (houseSize === "medium") {
        electricBill = 150;
    } else if (houseSize === "large") {
        electricBill = 300;
    }
    
    // Adjust electric bill if the user uses gas or oil for heating and/or cooking
    if (heatingType === "gas" || heatingType === "oil" || cookingGas === "often") {
        electricBill *= 0.8; // Reducing by 20%
    }
    
    // Set gas/oil bill based on heating type
    let gasBill = 0, oilBill = 0;
    if (heatingType === "gas") {
        gasBill = (cookingGas === "rarely") ? 50 : (cookingGas === "sometimes") ? 100 : 150;
    } else if (heatingType === "oil") {
        oilBill = (houseSize === "small") ? 30 : (houseSize === "medium") ? 60 : 100;
    }
    
    // Calculate electric footprint, gas footprint, and oil footprint
    let electricFootprint = electricBill * 105;
    let gasFootprint = gasBill * 105;
    let oilFootprint = oilBill * 113;
    
    // Adjust mileage footprint based on electric car ownership
    let mileageFootprint = mileage * (electricCar === "yes" ? 0.4 : 0.79); // Assuming electric cars have a lower footprint
    let shortFlightFootprint = shortFlights * 1100;
    let longFlightFootprint = longFlights * 4400;
    
    // Calculate recycling impact
    let recycleFootprint = 0;
    if (recycleAtHome === "yesAll") {
        recycleFootprint = 0; // No additional footprint
    } else if (recycleAtHome === "yesSome") {
        recycleFootprint = 100; // Moderate impact
    } else {
        recycleFootprint = 400; // Higher impact
    }
    
    // Total carbon footprint
    console.log(mileage);
    console.log(mileageFootprint);
    console.log(shortFlightFootprint);
    console.log(longFlightFootprint);
    let totalFootprint = electricFootprint + gasFootprint + oilFootprint + mileageFootprint + shortFlightFootprint + longFlightFootprint + recycleFootprint;
    
    // Display result and comparison 
    let resultText = `Your estimated yearly carbon footprint is: ${totalFootprint.toFixed(2)} pounds of CO2\n`;
    
    if (totalFootprint < 6000) { 
        resultText += "You have a very low carbon footprint. Great job!"; 
    } else if (totalFootprint >= 6000 && totalFootprint < 16000) {
        resultText += "Your carbon footprint is considered low."; 
    } else if (totalFootprint >= 16000 && totalFootprint < 22000) {
        resultText += "Your carbon footprint is average."; }
    else {
        resultText += "Your carbon footprint is high. Consider adopting more sustainable practices.";
    } 
    document.getElementById("result").innerText = resultText; 

}

function calculateYearlyMileage(frequency) {
    switch(frequency) {
        case "Every day":
            return 13000;
        case "A few times a week":
            return 5000;
        case "A few times a month":
            return 750;
        case "Rarely":
            return 200;
        case "Never":
            return 0;
        default:
            return "Unknown";
    }
}

function estimateShortFlights(frequency) {
    switch(frequency) {
        case "0":
            return 0;
        case "1-3":
            return 2;
        case "4+":
            return 5;
        default:
            return "Unknown";
    }
}



