
import React, { useState } from 'react'
import './App.css';

const FetchAPI = () => {
  const [result, setresult] = useState(null);
  const [simulatorstatus, setsimulatorstatus] = useState(null);
  

  const BatteryOn = async () => {
    document.getElementsByClassName('yt-loader')[0].style.display = "block";
    console.log("BatteryON")
     console.log("changes again")


    await fetch(`https://api.thingspeak.com/update?api_key=FVXMUNKFSR3PRVRT&field2=1`).then(res => {

      setTimeout(() => {
        document.getElementsByClassName('yt-loader')[0].style.display = "none";
        fetch(`https://api.thingspeak.com/channels/1985134/fields/2.json?results=1`)
          .then((response) => response.json())
          .then((jsdata) => {
            console.log("data", jsdata.feeds[0].field2);
            if (jsdata.feeds[0].field2 == 1) {
              setresult("on")
              setTimeout(() => {
                alert('Batteryon')
              }, [2000])
            }
            else { alert('data not update') }
          });

      }, [5500])


    })
  }


  const BatteryOff = () => {
    document.getElementsByClassName('yt-loader')[0].style.display = "block";
    fetch("https://api.thingspeak.com/update?api_key=FVXMUNKFSR3PRVRT&field2=0").then(res => {
      setTimeout(() => {
        document.getElementsByClassName('yt-loader')[0].style.display = "none";
        fetch(`https://api.thingspeak.com/channels/1985134/fields/2.json?results=1`)
          .then((response) => response.json())
          .then((jsdata) => {
            console.log("data", jsdata.feeds[0].field2);
            if (jsdata.feeds[0].field2 == 0) {
              setresult("off");
              setTimeout(() => {
                alert('Batteryoff')
              }, [2000])
            }
            else { alert('data not update') }
          });
      }, [5500])

    })

  };

  const SimulatorOn = () => {
    document.getElementsByClassName('yt-loader')[0].style.display = "block";

    fetch("https://api.thingspeak.com/update?api_key=FVXMUNKFSR3PRVRT&field2=1").then(res => {
      setTimeout(() => {
        document.getElementsByClassName('yt-loader')[0].style.display = "none";

        fetch(`https://api.thingspeak.com/channels/1985134/fields/2.json?results=1`)
          .then((response) => response.json())
          .then((jsdata) => {
            console.log("data", jsdata.feeds[0]);
            if (jsdata.feeds[0].field2 == 1) {
              setsimulatorstatus("on")
              setTimeout(() => {
                alert('Simulatoron')
              }, [2000])
            }
            else { alert('data not update') }
          });

      }, [5500])
    })


  };

  const SimulatorOff = () => {
    document.getElementsByClassName('yt-loader')[0].style.display = "block";


    fetch("https://api.thingspeak.com/update?api_key=FVXMUNKFSR3PRVRT&field2=0").then(res => {
      setTimeout(() => {
        setsimulatorstatus("off")

        document.getElementsByClassName('yt-loader')[0].style.display = "none";
        fetch(`https://api.thingspeak.com/channels/1985134/fields/2.json?results=1`)
          .then((response) => response.json())
          .then((jsdata) => {
            console.log("data", jsdata.feeds[0].field2);
            if (jsdata.feeds[0].field2 == 0) {
              setsimulatorstatus("off")
              setTimeout(() => {
                alert('Simulatoroff')
              }, [2000])
            }
            else { alert('data not update') }
          });

      }, [5500])
    })


  };

  return (
    <div>
      <div className="yt-loader"></div>

      <div class="center">
        <h3>Battery : {result}</h3><br />

        <button class="button1" onClick={BatteryOn} > batteryon</button>

        <button class="button2" onClick={BatteryOff}> batteryoff</button>
      </div>
      <br /><br />

      <div class="center">

        <h3>simulator : {simulatorstatus}</h3><br />


        <button class="button1" onClick={SimulatorOn} > simulatoron</button>{''}

        <button class="button2" onClick={SimulatorOff}> simulatoroff</button>

      </div>
      <br /><br />


    </div>

  );
}
export default FetchAPI;
