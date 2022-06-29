// <?php
// namespace App\Helpers;
// use DB;
// use Session;
// use Cookie;
// class Helper

// {
//     # To prepare statement for procedure call.
// 	public static function makeProcedureCall($arrVals,$debug=0){
// 		$parmaset="SET ";
// 		if(!empty($arrVals)) {
// 			foreach($arrVals as $key => $val) {
// 				$parmaset .= '@p_' . $key . "='" . str_replace(array("'", "\\", '"'), array("''", "\\\\\\\\", '\"'), $val) . "',";
// 			}
// 			if($debug) {
// 				$parmaset .= "@p_debug=1";
// 			}
			
// 			$parmaset = rtrim($parmaset, ',');
		
// 		}else{
// 			$parmaset .= "@p_empty='1'";
// 		}
// 		return $parmaset; 
// 	}	
// 	# To prepare statement for procedure call.
// 	public static function makeProcedureCallArr($arrVals,$debug=0){
//         //print_r($arrVals);exit;
// 		$parmaset="SET ";
// 		if(!empty($arrVals)) {
// 			foreach($arrVals as $key => $val) {
// 				if($val[0]){
// 					$parmaset .= '@p_' . $key . "='" . str_replace(array("'", "\\", '"'), array("''", "\\\\\\\\", '\"'), $val[1]) . "',";
// 				}else{
// 					$parmaset .= '@p_' . $key . "=" . str_replace(array("'", "\\", '"'), array("''", "\\\\\\\\", '\"'), $val[1]) . ",";
// 				}
// 			}
// 			if($debug) {
// 				$parmaset .= "@p_debug=1";
// 			}
			
// 			$parmaset = rtrim($parmaset, ',');
		
// 		}else{
// 			$parmaset .= "@p_empty='1'";
// 		}

// 		return $parmaset; 
// 	}	
// 	# To cut the string to a specific length.
//     public static function cut($string, $max_length) {
//         if (strlen($string) > $max_length) {
//             $string = substr($string, 0, $max_length);
//             $pos = strrpos($string, " ");
//             if ($pos === false) {
//                 return substr($string, 0, $max_length) . "...";
//             }
//             return substr($string, 0, $pos) . "...";
//         } else {
//             return $string;
//         }
//     }
//     public static function formatDateForMySqlDB($date,$time=0) {
//     	$formatdate='';
//     	if($time==1){
//     		$formatdate = date("Y-m-d h:i:s", strtotime($date));
//     	}else{
//     		$formatdate = date("Y-m-d", strtotime($date));
//     	}
//         return $formatdate;
//     }
//     public static function getHasedPassword($password,$type) {
       
//         if($type=='PASSWORD_ARGON2I'){
//         	$haspassword = password_hash($password, PASSWORD_ARGON2I);
//         }else if($type=='PASSWORD_DEFAULT'){
//         	$haspassword = password_hash($password, PASSWORD_DEFAULT);
//         }else{
//             $haspassword = password_hash($password, PASSWORD_BCRYPT);
//         }
//         return $haspassword;
//     }
//     public static function getUserPhoto() {
//         $loginUserId = session()->has('userId') ? session()->get('userId'):0;
//         $result = DB::table('tbl_user_mstr')->select('TUM_User_Image')->where('TUM_User', '=', $loginUserId)->get();
//         if(!empty($result[0])){
//             $profileOrgImg = ($result[0]->TUM_User_Image !='')? 'storage/'.$result[0]->TUM_User_Image : 'dist/img/user2-160x160.jpg';
//         }else{
//             $profileOrgImg = 'asset("public/dist/img/user2-160x160.jpg")';
//         }
//         return $profileOrgImg;
//     }
//     public static function getUserName() {
//         $loginUserId = session()->has('userId') ? session()->get('userId'):0;
//         $result = DB::table('tbl_user_mstr')->select('TUM_User_Name','TUM_User_Lname')->where('TUM_User', '=', $loginUserId)->get();
//         echo !empty($result[0]) ? $result[0]->TUM_User_Name.' '.$result[0]->TUM_User_Lname :'';
//     }
//     // public static function getUserDesignation() {
//     //    $loginUserId = session()->has('userId') ? session()->get('userId'):0;
//     //    $result = DB::table('tbl_user_mstr as tum')
//     //             ->leftJoin('tbl_designation_mstr as tdm','tdm.TDM_Desig','=','tum.TUM_User_Desig')
//     //             ->select('tdm.TDM_Desig_Name')
//     //             ->where('tum.TUM_User', '=', $loginUserId)->get();
    
//     //    echo $userdesig= (!empty($result[0])) ? $result[0]->TDM_Desig_Name :'';
//     // }
//     public static function getUserType() {
//        $loginUserId = session()->has('userId') ? session()->get('userId'):0;
//        $loginUserType = session()->has('userType') ? session()->get('userType'):'';
//        $result = DB::table('tbl_user_mstr as tum')
//                 ->leftJoin('tbl_user_type_mstr as utm','utm.TUT_UserType','=','tum.TUM_User_UserType')
//                 ->select('utm.TUT_UserTypeName')
//                 ->where('tum.TUM_User', '=', $loginUserId)->get();
    
//        echo $usertype= (!empty($result[0])) ? $result[0]->TUT_UserTypeName :'';
//     }
//     public static function getUserRegDate() {
//         $loginUserId = session()->has('userId') ? session()->get('userId'):0;
//         $result = DB::table('tbl_user_mstr')->select('TUM_User_CreatedOn')->where('TUM_User', '=', $loginUserId)->get();
//         echo !empty($result[0]) ? date('M, Y',strtotime($result[0]->TUM_User_CreatedOn)) :'';
//     }
//     public static function getResetOtpTime() {
//         $result = DB::table('tbl_user_login_setting')->select('TULS_Reset_OTP_Time')->get();
//         return !empty($result[0]) ? $result[0]->TULS_Reset_OTP_Time :'';
//     }
//     public static function getResetPasswordPolicy() {
//         $result = DB::table('tbl_password_policy_mstr')->get();
//         return !empty($result[0]) ? $result[0] :array();
//     }
//     public static function getUserLoginsetting() {
//         $result = DB::table('tbl_user_login_setting')->get();
//         return !empty($result[0]) ? $result[0] :array();
//     }
//     public static function getAdminInfo() {
//         $result = DB::table('tbl_user_mstr')->select('TUM_User_Mobile','TUM_User_Email')->where('TUM_User', '=','user001')->get();
//         return !empty($result[0]) ? $result[0] :array();
//     }
//     //Check security for hacking
//     public static function checkSecurity($server){    
// 		if(isset($server['REQUEST_METHOD']) && $server['REQUEST_METHOD']=='POST'){
// 			if(false !== strpos($server['SERVER_NAME'],SERVER_NAME)){      
// 				return true;
// 			}else{
// 				return false;
// 			}
			
// 		}else{
// 			return false;
// 		}
// 	}
// 	//Protect form XSS
// 	public static function checkXss($string='',$stripTag=true,$htmlspecialcharacter=true){
// 		if($stripTag){
// 			$string=strip_tags($string);
// 			$string = str_ireplace( '%3Cscript', '', $string );
// 		}		
// 		if($htmlspecialcharacter){
// 			$string=htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
// 		}		
// 		return $string;
// 	}
// 	//Check from XSS and SQL Injection
// 	public static function checkXssSqlInjection($string='',$stripTag=true,$htmlspecialcharacter=true,$mysql_real_escape=true){
		
// 		if($stripTag){
// 			$string=strip_tags($string);
// 		}
// 		if($htmlspecialcharacter){
// 			$string=htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
// 		}
// 		if($mysql_real_escape){
// 			//$string=mysqli_real_escape_string($this->connection_db,$string);
// 			$string= str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $string); 
// 		}
// 		return $string;
// 	}
// 	//Check sqlinjection
// 	public static function checkSqlInjection($string='',$mysql_real_escape=true){		
// 		if($mysql_real_escape){
// 			//$string=mysqli_real_escape_string($this->connection_db,$string);
// 			$string= str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $string); 
// 		}
// 		return $string;
// 	}	
	
// 	//Clean xss
// 	public static function xss_clean($data){
//         // Fix &entity\n;
//         $data = str_replace(array('&amp;','&lt;','&gt;'), array('&amp;amp;','&amp;lt;','&amp;gt;'), $data);
//         $data = preg_replace('/(&#*\w+)[\x00-\x20]+;/u', '$1;', $data);
//         $data = preg_replace('/(&#x*[0-9A-F]+);*/iu', '$1;', $data);
//         $data = html_entity_decode($data, ENT_COMPAT, 'UTF-8');
//         // Remove any attribute starting with "on" or xmlns
//         $data = preg_replace('#(<[^>]+?[\x00-\x20"\'])(?:on|xmlns)[^>]*+>#iu', '$1>', $data);
//         // Remove javascript: and vbscript: protocols
//         $data = preg_replace('#([a-z]*)[\x00-\x20]*=[\x00-\x20]*([`\'"]*)[\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2nojavascript...', $data);
//         $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2novbscript...', $data);
//         $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*-moz-binding[\x00-\x20]*:#u', '$1=$2nomozbinding...', $data);
//         // Only works in IE: <span style="width: expression(alert('Ping!'));"></span>
//         $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?expression[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
//         $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?behaviour[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
//         $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:*[^>]*+>#iu', '$1>', $data);
//         // Remove namespaced elements (we do not need them)
//         $data = preg_replace('#</*\w+:\w[^>]*+>#i', '', $data);
//         do{
// 		// Remove really unwanted tags
// 		$old_data = $data;
// 		$data = preg_replace('#</*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|i(?:frame|layer)|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|title|xml)[^>]*+>#i', '', $data);
//         }while ($old_data !== $data);
//         // we are done...
//         return $data;
// 	}
	
// 	//Genrate Key for url passing
// 	public static function keyMaker($id){ 
// 		//generate the secret key anyway you like. It could be a simple string like in this example or a database 
// 		//look up of info unique to the user or id. It could include date/time to timeout keys. 
// 		$secretkey='1HutysK98UuuhDasdfafdCrackThisBeeeeaaaatchkHgjsheIHFH44fheo1FhHEfo2oe6fifhkhs'; 
// 		$key=md5($id.$secretkey); 
// 		return $key; 
// 	} 

//     public static function getLoginUserInfo() {
//         $loginUserId = session()->has('userId') ? session()->get('userId'):0;
//         $result = DB::table('tbl_user_mstr as tum')
//         		->leftjoin('tbl_userrole_assign as tua','tum.TUM_User', '=', 'tua.TURA_User')
//                 ->leftjoin('tbl_userrole_mstr as turm','tua.TURA_UserRole', '=', 'turm.TURM_UserRole')
                

//                 ->leftjoin('tbl_grampanchayat_list_mstr as tgpl','tum.TUM_Panchayat', '=', 'tgpl.TGPM_Panchayat_Code')
//                 ->leftjoin('tbl_district_mstr as tdtm','tum.TUM_District', '=', 'tdtm.TDM_Dist_Code')
//                 ->leftjoin('tbl_block_list_mstr as tbl','tum.TUM_Block', '=', 'tbl.TBLM_Block_Code')
//                 ->leftjoin('tbl_caste_mstr as tcm','tum.TUM_Caste','=','tcm.TCM_Id')

//                 ->select('tum.TUM_User_Name','tum.TUM_User_Lname','tum.TUM_Caste','tcm.TCM_Caste','tcm.TCM_Caste_Odia','tcm.TCM_Caste_Combined', DB::raw("(GROUP_CONCAT(tua.TURA_UserRole)) as assignedRoles"),DB::raw("(GROUP_CONCAT(turm.TURM_URole_Name)) as assignedRolesName"),'tgpl.TGPM_Panchayat_Code','tgpl.TGPM_Panchayat_Name','tdtm.TDM_Dist_Code','tdtm.TDM_Dist_Name','tbl.TBLM_Block_Code','tbl.TBLM_Block_Name',"TUM_User_Mobile")
//         		->where('tum.TUM_User', '=', $loginUserId)
//         		->groupBy('tua.TURA_User')
//         		->get();
        		
//         return !empty($result[0]) ? $result[0] :array();
//     }
//     public static function getRoleWiseModuleAndFunction($role) {
//         //$loginUserId = session()->has('userId') ? session()->get('userId'):0;
//         $result = DB::table('tbl_roleactivity_assign as tra')
//                 ->leftjoin('tbl_module_mstr as tmm','tra.TRAM_Module', '=', 'tmm.TMM_Module')
//                 ->leftjoin('tbl_function_mstr as tfm','tra.TRAM_Function', '=', 'tfm.TFM_Function')  
//                 ->select('tra.TRAM_UserRole', 'tra.TRAM_Module', 'tmm.TMM_Modl_Name','tmm.TMM_Modl_Name_Odia', 'tra.TRAM_Function', 'tfm.TFM_Functn_Name', 'tfm.TFM_Functn_Name_Odia','tfm.TFM_Functn_URL','tmm.TMM_Module_Logo')
//                 ->where('tra.TRAM_UserRole', '=', $role)
//                 ->where('tmm.TMM_Modl_DeletedFlag', '=', false)
//                 ->where('tfm.TFM_Functn_DeletedFlag', '=', false)
//                 ->orderBy('TMM_Sort_Order','asc')
//                 ->get();
//             //print_r($result[0]->TUM_User_Dept);
//         return !empty($result) ? $result :array();
//     }
//     public static function getStatusNameLogo() {
//         //$loginUserId = session()->has('userId') ? session()->get('userId'):0;
//         $result = DB::table('tbl_status_mstr')
//                 ->select('TSM_Status','TSM_Status_Name', 'TSM_Status_Name_Odia','TSM_Status_Logo')
//                 ->where('TSM_Status_DeletedFlag', '=', false)
//                 ->get();
//         foreach($result as $val){
//             $resArr[$val->TSM_Status_Name]=$val->TSM_Status_Logo;
//         }        
//         return !empty($resArr) ? $resArr :array();
//         //return !empty($result) ? $result :array();
//     }
     
//      #################################################################################################
//     //===================The function  getStatusNameLogo1() is used in Election Controller ==================//
//     public static function getStatusNameLogo1() {
//         //$loginUserId = session()->has('userId') ? session()->get('userId'):0;
//         $result = DB::table('tbl_status_mstr')
//                 ->select('TSM_Status','TSM_Status_Name', 'TSM_Status_Name_Odia','TSM_Status_Logo')
//                 ->where('TSM_Status_DeletedFlag', '=', false)
//                 ->get();
//         // foreach($result as $val){
//         //     $resArr[$val->TSM_Status_Name]=$val->TSM_Status_Logo;
//         // }        
//         // return !empty($resArr) ? $resArr :array();
//         return !empty($result) ? $result :array();
//     }

//     //===================The above function getStatusNameLogo1() is used in Election Controller ==================//
//       #################################################################################################
    
 
//     public static function getAssignedUserInfo($userId) {
//         //$loginUserId = session()->has('userId') ? session()->get('userId'):0;
//         $result = DB::table('tbl_user_mstr as tum')
//                 ->select('tum.TUM_User as userid', 'tum.TUM_User_Email as useremail', 'tum.TUM_User_Mobile as usermobile',DB::raw("(CONCAT(tum.TUM_User_Name,' ',tum.TUM_User_Lname)) as username"))
//                 ->where('tum.TUM_User', '=', $userId)
//                 ->where('tum.TUM_User_DeletedFlag', '=', 0)
//                 ->where('tum.TUM_User_Status', '=', 1)
//                 ->get();
//         return !empty($result[0]) ? $result[0]:array();
//     }
   
  
//     public static function getUserNotification() {
//         $loginUserId = session()->has('userId') ? session()->get('userId'):0;
//         $result = DB::table('tbl_user_notification')->select('TUN_UserNotification','TUN_Notification_Request','TUN_Notification_RequestType')->where('TUN_Notification_User', '=', $loginUserId)->where('TUN_Notification_IsRead', '=', 0)->get();
//         return !empty($result) ? $result:array();
//     }
//     public static function getRecommendationLetterFormat($emailid) {
//         $result = DB::table('tbl_email_mstr')->select('TEM_Email_Body','TEM_Email_Subject')->where('TEM_Email', '=', $emailid)->where('TEM_Email_Status', '=', 1)->get();
//         return !empty($result[0]) ? $result[0]:array();
//     }

  
//     public static function getMessageText($msgId) {
//         $languageId = session()->has('sess_langId') ? session()->get('sess_langId'):1;
//         $result = DB::table('tbl_msglabel_mstr')->select('TMLP_MessageValue')->where('TMLP_MessageId', '=', $msgId)->where('TMLP_Language', '=', $languageId)->get();
//         echo !empty($result[0]) ? $result[0]->TMLP_MessageValue :'';
//     }

//     public static function getMessageTextNew($msgId) {
//         $languageId = session()->has('formLang') ? session()->get('formLang'):'eng';

//         if($languageId != 'eng'){
//             $result = DB::table('tbl_msglabel_mstr')->select('TMLP_MessageValue')->where('TMLP_MessageId', '=', $msgId)->where('TMLP_Language', '!=',1 )->get();
//         }else{
//             $result = DB::table('tbl_msglabel_mstr')->select('TMLP_MessageValue')->where('TMLP_MessageId', '=', $msgId)->where('TMLP_Language', '=',1 )->get();
//         }
        
//         echo !empty($result[0]) ? $result[0]->TMLP_MessageValue :'';
//     }

//     //sms function
//     public static function sendSMSTest11($mobileno,$msg){
//         $msg = urlencode($msg);
//         //$res="http://msg.smstbbsr.com/api/push.json?apikey=5ebd7110f268b&sender=UNOTAP&mobileno=$mobileno&text=$msg";
//         $request_url ="http://opsconline.gov.in/dnld/sms.php?mobile=$mobileno&message=$msg";
//         //echo $request_url;exit;
//         $ch = curl_init();
//         curl_setopt($ch, CURLOPT_URL, $request_url);
//         curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//         //curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
//         curl_setopt($ch, CURLOPT_POST, 1);
//         //curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
//         curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array()));
//         curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
//         $output = curl_exec($ch);
//         $err = curl_error($ch);
        
//         if(!$output){
//             return $err;
//         }
//         print_r($output);exit;
//          //$out = explode(":", $output);
//         $resarr = json_decode($output, true);
//         if ($resarr['status'] == "success") {
//             return 1;
//         }else{
//             return 0;
//         }
//         curl_close($ch);
//     }
//     //MAIL_PASSWORD='C;}i8.NY!s%W'
//     public static function sendUserSMS($type,$mobileno,$message){
//         set_time_limit(0);
//         $username="opscsms2012-OROPSC"; //username of the department
//         $password="Odisha@12345"; //password of the department
//         $senderid="OROPSC"; //senderid of the deparment
        
//         $deptSecureKey= "a83ba70f-eeba-40f1-b582-9e050f2f5a87"; //departsecure key for encryption of message...
//         $encryp_password=sha1(trim($password));
//         //echo $type.'=='.$mobileno.'=='.$message;exit;
//         $messageresponse =''; 
//         if($mobileno !=''){
//             if($type==1){
//                 //call method and pass value to send single sms, uncomment next line to use
//                 $messageresponse = self::sendSingleSMS($username,$encryp_password,$senderid,$message,$mobileno,$deptSecureKey);
//             }else if($type==2){
//                 //call this method and pass value to send bulk sms, uncomment next line to use
//                 $messageresponse = self::sendBulkSMS($username,$encryp_password,$senderid,$message,$mobileno,$deptSecureKey);
//             }else{
//                 //call method and pass value to send otp sms, uncomment next line to use
//                 $messageresponse = self::sendOtpSMS($username,$encryp_password,$senderid,$message,$mobileno,$deptSecureKey);
//             }
//         }
//         return $messageresponse;
//     }
//     //function to send sms using by making http connection
//     public static function post_to_url($url, $data) {
//          $fields = '';
//          foreach($data as $key => $value) {
//          $fields .= $key . '=' . urlencode($value) . '&';
//          }
//          rtrim($fields, '&');
//          $post = curl_init();
//          //curl_setopt($post, CURLOPT_SSLVERSION, 5); // uncomment for systems supporting TLSv1.1 only
//          curl_setopt($post, CURLOPT_SSLVERSION, 6); // use for systems supporting TLSv1.2 or comment the line
//          curl_setopt($post,CURLOPT_SSL_VERIFYPEER, false);
//          curl_setopt($post, CURLOPT_URL, $url);
//          curl_setopt($post, CURLOPT_POST, count($data));
//          curl_setopt($post, CURLOPT_POSTFIELDS, $fields);
//          curl_setopt($post, CURLOPT_RETURNTRANSFER, 1);
//          $result = curl_exec($post); //result from mobile seva server
//          //echo $result; //output from server displayed
//          curl_close($post);
//     }
//     //Function to send single sms
//     public static function sendSingleSMS($action,$deptId,$templateId,$smsContent,$mobNo){
//          $key=hash('sha512',trim($username).trim($senderid).trim($message).trim($deptSecureKey));
         
//          $data = array(
//          "username" => trim($username),
//          "password" => trim($encryp_password),
//          "senderid" => trim($senderid),
//          "content" => trim($message),
//          "smsservicetype" =>"singlemsg",
//          "mobileno" =>trim($mobileno),
//          "key" => trim($key)
//          );
         
//          $result= self::post_to_url("https://msdgweb.mgov.gov.in/esms/sendsmsrequest",$data); //calling post_to_url to send sms
//          //echo $result;exit;
//     }
//     //Function to send otp sms
//     //public static function sendOtpSMS($username,$encryp_password,$senderid,$message,$mobileno,$deptSecureKey){
//     public static function sendOtpSMS($action,$deptId,$templateId,$smsContent,$mobNo){
//          //$key=hash('sha512',trim($username).trim($senderid).trim($message).trim($deptSecureKey));
         
        

//          $data = array(
//             "action" =>$action,
//             "department_id"=>$deptId,
//             "template_id"=>$templateId,
//             "sms_content"=>$smsContent,
//             "phonenumber"=>$mobNo
//          );
//          self::post_to_url("https://govtsms.odisha.gov.in/api/api.php",$data); //calling post_to_url to send otp sms
//     }
    
//     //function to send bulk sms
//     public static function sendBulkSMS($action,$deptId,$templateId,$smsContent,$mobNo){
//          // $key=hash('sha512', trim($username).trim($senderid).trim($message).trim($deptSecureKey));   
         
//           $data = array(
//             "action" =>$action,
//             "department_id"=>$$deptId,
//             "template_id"=>$templateId,
//             "sms_content"=>$smsContent,
//             "phonenumber"=>$mobNo
//          );
//          self::post_to_url("https://govtsms.odisha.gov.in/api/api.php",$data); //calling post_to_url to send bulk sms
//     }
//     public static function sendSMS($action,$deptId,$templateId,$smsContent,$mobNo){
//          //$key=hash('sha512',trim($username).trim($senderid).trim($message).trim($deptSecureKey));
         
        

//          $data = array(
//             "action" =>$action,
//             "department_id"=>$deptId,
//             "template_id"=>$templateId,
//             "sms_content"=>$smsContent,
//             "phonenumber"=>$mobNo
//          );
//          self::post_to_url("https://govtsms.odisha.gov.in/api/api.php",$data); //calling post_to_url to send otp sms
//     }
//     public static function setgrievancecookie(){
//         $generatecookievalue=substr(str_shuffle("0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"), 0, 16);
//         Cookie::make('sess_cookie',$generatecookievalue,60);
//         $cookval =Cookie::get('sess_cookie');
//         Session::put('sess_cookieopsc', $cookval);
//     }

//     public static function matchcookieval(){
//         $sess_cookies=Session::get('sess_cookieopsc');
//         $cookvalue=Cookie::get('sess_cookie');
//         if($cookvalue==$sess_cookies){
//              self::setgrievancecookie();
//             return true;
//          }else{
//             return false;
//          }
//     }
    
// }
