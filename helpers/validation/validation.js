
/*

==================================================================================================================
==================================================================================================================
##################Function to validate Year  ################# 

function yearValidation(fieldId,fieldType, message) {
    var year=$('#' + fieldId).val();
    var text = /^[0-9]+$/;
    if(year.length==4 ) {
      if (year != 0) {
          if ((year != "") && (!text.test(year))) {
  
              swal("Please Enter Numeric Values Only "+message);
              $('#' + fieldId).focus();
              return false;
          }
  
          if (year.length != 4) {
             swal("Year should be of 4 numeric digits "+message);
                $('#' + fieldId).focus();
              return false;
          }
         // var current_year=new Date().getFullYear();
          // if((year < 1920))
          //     {
          //     alert("Year should be in range 1920 to current year");
          //     return false;
          //     }
          return true;
      } else{
        swal("Year should be of 4 numeric digits "+message);
           $('#' + fieldId).focus();
         return false;
      }
    }else{
        swal("Year should be of 4 numeric digits "+message);
           $('#' + fieldId).focus();
         return false;
      }
  }

==================================================================================================================
==================================================================================================================

*/



  /*##################Function to check Textfield having no value ################# */
  exports.blankValidation = (data, fieldName,fieldType, message='') => {
      /*=====================For Textfield blankValidation================== */
      //if(fieldType == "TextField" || fieldType == "TextArea"){
        if (data == ''){
          
          message = fieldName + " cannot be blank"; //fieldName example- Name, Mobile Number, etc.
          return message;
        }
        return message;
      //}
  
  
  
  }
  
  /*#################Function to Check the character length of a field ####################### */
  exports.fieldLengthCheck = (data,fieldLen, fieldName,checkType) => {
    /*===============Function to Check the maxlength character of a field================ */
    let message = '';
    if(checkType == "Max"){
      if (data.length > fieldLen && data.length > 0){
          
          message = fieldName + ' cannot more than ' + fieldLen + ' charater !!!';
          return message;
      }
      return message;
    }
  
    /*===============Function to Check the minlength character of a field================ */
    if(checkType == "Min"){
      if (data.length < fieldLen && data.length > 0){
        
        message = fieldName + ' cannot less than ' + fieldLen + ' characters !!!';
        return message;
      }
      return message;
    }
  
    /*===============Function to Check the equality length character of a field================ */
    if(checkType == "Equal"){
      if (data.length != fieldLen && data.length > 0){
        
        message = fieldName + ' should be ' + fieldLen + ' digit length!!!';
        return message;
      }
      return message;
    }
  
  }
  
  /*############### Allow only Numeric Input and replace '' when find special character on keyup/keypress/keydown################*/
  /*=========Call Below function by on KeyUp======= */
  exports.checkNum = (data) => {
    var tempVal = data.replace(/[^0-9\.]/g,'');
    return tempVal;
  }
  
  exports.checkNumHiphen = (data) => {
    var tempVal = data.replace(/[^0-9\-]/g,'');
    return tempVal;
  } 
   
  exports.checkNumAndNa = (data) => {
    var tempVal = data.replace(/[^ANan0-9\.]/g,'');
    return tempVal;
  }
  exports.checkOnlyNaN = (data) => {
    if(isNaN(data)){
        if(data.toUpperCase() !='NA'){
            data = '';
            return data;
        }
    }
  }
  
  /*############### Allow only Alphabets and Numeric Input and replace '' when find special character on keyup/keypress/keydown ################ */
  /*=========Call Below function by on on KeyUp======= */
  function checkAlphabetAndNumber(fieldId){
    var tempVal = $("#"+fieldId).val().replace(/[^a-zA-Z0-9 ]/g,'');
    $("#"+fieldId).val(tempVal);
  }
  function checkOnlyAlphabet(fieldId){
    var tempVal = $("#"+fieldId).val().replace(/[^a-zA-Z ]/g,'');
    $("#"+fieldId).val(tempVal);
  }
  
  /*############### Allow only AlphaNumeric character ################ */
  /*=========Call Below function by on button submit ======= */
  function allowAlphaNumericCharacter(fieldId,message){
    var alphaNumericRegExp = new RegExp(/^([0-9]|[a-z])+([a-z]+)$/i);
    var fieldVal = $("#"+fieldId).val();
    
    if(alphaNumericRegExp.test(fieldVal) == false){
      $('#' + fieldId).focus();
      swal(message);
      return false;
    }
    return true;
  
  }
  
  /*############### Validate Special character ################ */
  /*=========Call Below function by on form submit or any event======= */
  function checkSpecialCharacter(fieldId,message){
    var SpecialCharRegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    var fieldVal = $("#"+fieldId).val();
    
    if(SpecialCharRegExp.test(fieldVal)){
      $('#' + fieldId).focus();
      swal(message);
      return false;
    }
    return true;
  }
  
  /*############### Function to check custom special character  ############### */
  /*============== custom Special character is input ============= */
  function checkCustomSpecialChar(fieldId,fieldName,splCharacterArr){
      var str = $('#' + fieldId).val();
      
      for (var i = 0; i < splCharacterArr.length; i++){
          if (str.indexOf(splCharacterArr[i]) > 0) {
              $('#' + fieldId).focus();
              swal("Special character " + splCharacterArr[i] + " is not allowed For "+ fieldName +"!!!");
              return false;
          }
      }
      return true;
  }
  
  /*#################### first character not to be special character #####################*/
  function checkSpecialCharacterFirst(fieldId,message){
      var SpecialCharRegExp = new RegExp("['\\\\><!@#%?_:;.^*)(}{$&+-=|\"]");
      //var SpecialCharRegExp = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      var strInputval = $('#' + fieldId).val();
      var firstChar = strInputval.charAt(0);
  
      if(SpecialCharRegExp.test(firstChar)){
        $('#' + fieldId).focus();
        swal(message);
        return false;
      }
      return true;
  }
  
  /*#################### first character not to be special character Custom input of regExp #####################*/
  function checkSpecialCharacterFirstCustom(fieldId,message,SpecialCharRegExp){
      //var SpecialCharRegExp = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      var strInputval = $('#' + fieldId).val();
      var firstChar = strInputval.charAt(0);
  
      if(SpecialCharRegExp.test(firstChar)){
        $('#' + fieldId).focus();
        swal(message);
        return false;
      }
      return true;
  }
  
  /*################ Function to check email for validation ############## */
  function checkEmailId(fieldId,message){
      //var pattern = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
      var emailPattern = /^[A-Za-z0-9\-_\.]+@+[A-Za-z0-9\-\.]+\.+[A-Za-z]{2,10}$/;
      var email = $('#' + fieldId).val();
      if (email != ''){
          if (emailPattern.test(email) == true)
              return true;
          else{
              $('#' + fieldId).focus();
              swal(message);
              return false;
          }
      }else
        return true;     
  }
  
  
  /*############## Function to check Valid indian Mobile number digit 0-9 and length=10 ############# */
  /*ex:  9861098610 */
  function checkMobileNumberIN(fieldId,message) {
      var mobile = $('#' + fieldId).val();
      var mobileReg = /^\d{10}$/;
      /* /^[0][1-9]\d{9}$|^[1-9]\d{9}$/g; */
  
      if (mobile != ''){
          if (mobileReg.test(mobile)){
              return true;
          }else {
              $('#' + fieldId).focus();
              swal(message);
              return false;
          }
      }else
          return true;
  }
  
  /*############## Function to check Valid indian Mobile number  digit 0-9, length=10, and countrycode ############# */
  /*ex:  +91 9861098610 or +919861098610 */
  function checkMobileNumberINCode(fieldId,message) {
      var mobile = $('#' + fieldId).val();
      var mobileReg = /^(\+\d{1,3}[-])\d{10}$/;
  
      if (mobile != ''){
          if (mobileReg.test(mobile)){
              return true;
          }else {
              $('#' + fieldId).focus();
              swal(message);
              return false;
          }
      }else
          return true;
  }
  /*############## Validate the telephone number ############## */
  /*example:+91-674-2495452  */
  function validateTelephone(fieldId, message) {
      var telephonVal = $('#'+fieldId).val();
      var telephoneReg = /^([1-9]{1}[0-9]{0,1}[0-9]{0,1}[\-]{1}[1-9]{1}[0-9]{1,5}[\-]{1})[1-9]{1}[0-9]{5,6}$/;
      //var telephoneReg = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
      alert((telephoneReg.test(telephonVal)));
      if (telephonVal != ''){
          if (telephoneReg.test(telephonVal))
              return true;
          else {
              $('#' + fieldId).focus();
              swal(message);
              return false;
          }
      }else
          return true;
  }
  //function to check file format
  function checkImageFormat(sender,size){
    var fileSize = $('#'+sender.id)[0].files[0].size/1024/1024;
    var validExts = new Array(".JPG", ".PNG", ".JPEG", ".PDF", ".TIFF");
    var fileExt = sender.value;
  
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    //console.log(fileExt);
    if(validExts.indexOf(fileExt.toUpperCase())<0){
      swal("Invalid file selected, valid files are of "+ validExts.toString()+ " types");
      $('#'+sender.id).val("");
      return false;
    }else if(fileSize > size){
      $('#'+sender.id).val("");
      swal("File size exceeds"+size+" MB");
    }else
      return true;
  }
  //function to check file format
  function checkImageFormatOnly(sender){
    var fileSize = $('#'+sender.id)[0].files[0].size/1024/1024;
    var validExts = new Array(".JPG", ".PNG", ".JPEG");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if(validExts.indexOf(fileExt.toUpperCase())<0){
      swal("Invalid file selected, valid files are of "+ validExts.toString()+ " types");
      $('#'+sender.id).val("");
      return false;
    }else if(fileSize >5){
      $('#'+sender.id).val("");
      swal("File size exceeds 5 MB");
    }else
      return true;
  }
  //function to check file format
  function checkFileFormat(sender){
    var fileSize = $('#'+sender.id)[0].files[0].size/1024/1024;
    var validExts = new Array(".PDF");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if(validExts.indexOf(fileExt.toUpperCase())<0){
      swal("Invalid file selected, valid files are of "+ validExts.toString()+ " types");
      $('#'+sender.id).val("");
      return false;
    }else if(fileSize >20){
      $('#'+sender.id).val("");
      swal("File size exceeds 10 MB");
    }else
      return true; 
  }
  //function for remove special characters from field
  function RemoveSQLCharacter(objId){
  
    var regex = new RegExp("['\\\\><!%?:;^*)(}{$&+=|\"]");
    var str = new String(document.getElementById(objId).value);
    if(regex.test(str)){
      document.getElementById(objId).value='';
      document.getElementById(objId).focus();
      swal("Special characters are not allowed");
      return false;
    }else
      return true;
     
  }
  function RemoveSQLCharacterForLabel(objId){
  
    var tempVal = $("#"+objId).val().replace(/['\\\\><!^*$}{+=|\"]/g,'');
    document.getElementById(objId).value=tempVal;
    //document.getElementById(objId).focus();
   
  }
  /*#################### first character not to be special character #####################*/
  function RemoveSQLCharacterForPassword(objId){
    //var SpecialCharRegExp = new RegExp("['\\\\><!@#%?_:;.^*)(}{&+-=|\"]");
    var tempVal = $("#"+objId).val().replace(/['\\\\><%^}{+=|\"]/g,'');
    document.getElementById(objId).value=tempVal;
  }
  
  var PatternsDict = new Object();
  // matches white space
  PatternsDict.whitespacepat = /\s+/;
  
  function isWhitespace1st(objId){
     var strInput   = new String(document.getElementById(objId).value);
     var objregExp  = new RegExp(PatternsDict.whitespacepat) ; 
     if(objregExp.test(strInput)){
       if(strInput.charAt(0)==" "){
          document.getElementById(objId).focus();
          swal("White space is not allowed at first place");
          return false;
         }
      }
       return true ;
  
   }
  function isWhitespaceLast(objId){
    var strInput   = new String(document.getElementById(objId).value);
    var objregExp  = new RegExp(PatternsDict.whitespacepat) ; 
    if(objregExp.test(strInput)){
      if(strInput.charAt(strInput.length-1)==" "){
        document.getElementById(objId).focus();
        swal("White space is not allowed at last place");
         return false;
        }
      }
      return true ;
  
  }
  function leftTrim(element)
  { 
      if(element)
          element.value=element.value.replace(/^\s+/,"");
  } 
  