const element = document.getElementsByTagName("button")[0];
element.addEventListener(("click") ,async function() {
  if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(showPosition);
      
  }
  else{
    alert("Unable to fetch data.Try again later");
    return;
  }
  
})


 function showPosition(position){
 
  

   let lat = position.coords.latitude;
   let long = position.coords.longitude;
  
   setTimeout(()=>{
    localStorage.setItem("latitude",lat);
    localStorage.setItem("longitude",long);
    window.location = "display.html" ;

   },1000);
   
  
  

  

}