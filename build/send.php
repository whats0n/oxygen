<?

    function strip_all($str_to_strip) {
        $striped=strip_tags($striped);
        $striped=urldecode($str_to_strip);
        $striped=mysql_escape_string($striped);
        return $striped;
    }

    //DATA

    //step 1
    $step_mail = $_POST['step_1-email'];
    //step 2
    $step_checkbox_first = $_POST['step_2-checkbox-1'];
    $step_checkbox_second = $_POST['step_2-checkbox-2'];
    //step 3
    $step_email_third = $_POST['step_3-email'];
    $step_phone_third = $_POST['step_3-phone'];
    $step_country_third = $_POST['step_3-country'];
    $step_amount_value_third = $_POST['step_3-amount-value'];
    $step_amount_type_third = $_POST['step_3-amount-type'];
    // $femail = 'whatever@what.as';


    //yb@uxdepot.ru

    $headers = 'MIME-Version: 1.0' . "\r\n" ;
    $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n" ;
    $headers .= 'From: Wisetest <info@medusabrush.com>' . "\r\n";

    //MESSAGES

    $new_line = "\n<br>\n\n";

    //first step
    $message_step_first_title = "Step 1: ".$new_line;
    $message_step_first = "Email:\n ".$step_mail.$new_line;

    //second step
    $message_step_second_title = "Step 2: ".$new_line;

    $message_step_second = "Checkbox 1:\n ".$step_checkbox_first.$new_line;
    $message_step_second .= "Checkbox 2:\n ".$step_checkbox_second.$new_line;

    //third step
    $message_step_third_title = "Step 3: ".$new_line;

    $message_step_third = "E-mail:\n ".$step_email_third.$new_line;
    $message_step_third .= "Phone:\n ".$step_phone_third.$new_line;
    $message_step_third .= "Country:\n ".$step_country_third.$new_line;
    $message_step_third .= "Amount Value:\n ".$step_amount_value_third.$new_line;
    $message_step_third .= "Amount Type:\n ".$step_amount_type_third.$new_line;

    //META INFO
    $message_meta = "\n<br>\n\n"."\n<br>\n\n"."Useragent:".$_SERVER['HTTP_USER_AGENT']."\n\n\t\t=====\\" . $_SERVER['REMOTE_ADDR'];

    //FINAL MESSAGE
    $message = $message_step_first_title
        .$message_step_first
        .$message_step_second_title
        .$message_step_second
        .$message_step_third_title
        .$message_step_third
        .$message_meta;

    mail('hello@oxygen.com', '[OXYGEN] Beta', $message, $headers);
    echo 'Sent';
?>