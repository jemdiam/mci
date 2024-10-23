function carbonFootprintCalculator() {
    
    // Collect form values
    let houseSize = document.querySelector('input[name="houseSize"]:checked').value;
    let heatingType = document.querySelector('input[name="heatingType"]:checked').value;
    let cookingGas = document.querySelector('input[name="cookingGas"]:checked').value;
    let mileage = parseFloat(document.querySelector('input[name="mileage"]').value) || 0;
    let shortFlights = parseFloat(document.querySelector('input[name="shortFlights"]').value) || 0;
    let longFlights = parseFloat(document.querySelector('input[name="longFlights"]').value) || 0;
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
    let totalFootprint = electricFootprint + gasFootprint + oilFootprint + mileageFootprint + shortFlightFootprint + longFlightFootprint + recycleFootprint;
}