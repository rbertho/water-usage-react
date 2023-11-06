const LoadRentDetails = (idDevice) => {
    const options = {
        mode: 'cors',
        cache: 'default'
    }

    let json = [0]
    try{
        fetch(`https://smart-water-rodrigos-projects-f9ec54f8.vercel.app/renter?id_device=${idDevice}`, options)
        .then(result => result.json())
        .then(json => fillRenterDetails(json))
    }
    catch{}
}

const fillRenterDetails = (json) => {
    json.forEach(element => {
        document.getElementById("rentervalue").value = element.name
        document.getElementById("unitvalue").value = element.rent_unit
    })
}

export default LoadRentDetails