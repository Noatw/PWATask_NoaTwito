window.addEventListener("DOMContentLoaded", function () {

  document.getElementById("find-me").addEventListener("click", geoFindMe);
  document.getElementById("shareBtn").addEventListener("click", share);
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  const iframe = document.querySelector('#iframe');
  const shareBtn = document.querySelector('#shareBtn');
  mapLink.href = '';
  mapLink.textContent = '';




  function geoFindMe() {

    if (!navigator.geolocation) {
      status.textContent = 'אין תמיכה במיקום';
    } else {
      status.textContent = 'טוען את מיקומך…';
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      status.textContent = '';
      mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
      iframe.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`
      iframe.classList.remove("d-none");
      shareBtn.classList.remove("disabled");

    }

    function error() {
      status.textContent = 'Unable to retrieve your location';
    }



  }


  async function share() {
    const shareData = {
      title: 'MDN',
      text: 'Learn web development on MDN!',
      url: mapLink
    }


    // Share must be triggered by "user activation"
    try {
      await navigator.share(shareData);
      //resultPara.textContent = 'MDN shared successfully';
    } catch (err) {
      //resultPara.textContent = `Error: ${err}`;

    }
  }
})