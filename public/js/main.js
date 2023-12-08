const submitBtn = document.getElementById('submitbtn');
const cityName = document.getElementById('cityname');
const city_name = document.getElementById('city_name');
const temp_val = document.getElementById('temp_val');
const weatherStatus = document.getElementById('weather_status');
const datahide = document.querySelector('.temp_section');

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
       city_name.innerText = `Please Enter the name of city`;
       datahide.classList.add('data_hide');
    }
    else{
        try{
            let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f0f481cd401a1bd94556afd52c6c582d`;
            const response = await fetch(api);
            const data = await response.json();
            const arrData = [data];
            console.log(data);
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_val.innerText = arrData[0].main.temp;
            // weatherStatus.innerText = arrData[0].weather[0].main;

            const tempmode = arrData[0].weather[0].main;
            // Condition to check Sunny or Cloudy
            if(tempmode == "Clear"){
                weatherStatus.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>"
            }
            else if(tempmode == "Clouds"){
                weatherStatus.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>"
            }
            else if(tempmode == "Rain"){
                weatherStatus.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>"
            }
            else{
                weatherStatus.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>"
            }
            datahide.classList.remove('data_hide');
        }
        catch{
            city_name.innerText = `Please Enter Proper Name of the City`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo)