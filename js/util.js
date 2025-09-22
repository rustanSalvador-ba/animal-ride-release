import swal from 'sweetalert'

  export function queryString(parameter) {
    var loc = atob(location.search.substring(1, location.search.length));
    var param_value = false;
    var params = loc.split("&");
    for (i = 0; i < params.length; i++) {
      param_name = params[i].substring(0, params[i].indexOf('='));
      if (param_name == parameter) {
        param_value = params[i].substring(params[i].indexOf('=') + 1)
      }
    }
    if (param_value) {
      return param_value;
    } else {
      return undefined;
    }
}

async function server(method, url, data){
  let response =  await $.ajax({
      type : method,
      url  : "https://corona.mastermovel.com.br/" + url,
      data : data,
      dataType: 'json',
      beforeSend: function()
      { 
        $("#loader").show();
      },
      success :  function(response){
        $("#loader").hide();
        return response;
      },
      error: function(error){
        $("#loader").hide();
        return error;
      }
    }
  );    
  return response;
}
   
export function getUser(){
  let data = {
    "nome":"felipe",
    "online":false
  }
  return data;
}

export default function login(e){
  if (e.target) {
    let data = {'email': $('#email').val(),'password': $('#psw').val()}
    loginUser(data)
  }
}

function loginUser(data){
  
 server('POST', 'api/login', data)
  .then(response => {
   swal(response)
  })
  .catch(error => {
   let msg = ""
   let errors = error?.responseJSON?.error

   if (typeof(errors) === "object" ){
      error.responseJSON.error.map((error) => {
        msg+=error+"\n"
      })
    } else {
      msg = errors
    }

   swal("Ops!!!", msg, "error")
  })
}



