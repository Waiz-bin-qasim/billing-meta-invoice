import React, { useState } from "react";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/Eocean.png";
import EmailVerify from 'views/auth/forgot-password/components/emailVerification'
import ResetPassword from 'views/auth/forgot-password/components/resetPassword'

function ForgotPassword() {
  const [stepOnePassed, setStepOnePassed] = useState(false)
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      {stepOnePassed?<ResetPassword/>:<EmailVerify setStepOnePassed={setStepOnePassed} />}
    </DefaultAuth>
  );
}

export default ForgotPassword;
