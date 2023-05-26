import { api } from "../app-consts"
import axios from "axios"



export const authApi = {


  registerUser: async function (phoneNumber) {
    phoneNumber = phoneNumber.substring(1)
     await axios.post(`${api.BASE_URL}/login/otp`, {
      PhoneCountryPrefix: '+44',
      PhoneLocalNumber: '0' + phoneNumber,
      PhoneE164Format: '+44' + phoneNumber,
      FirstName: 'Johnny',
      LastName: 'Cash',
      Type: 1,
    });
  },

  login: async function (phoneNumber, otp) {
    phoneNumber = phoneNumber.substring(1)
    console.log(otp)
    console.log(phoneNumber)
    await axios.post(`${api.BASE_URL}/login/verify`, {
      OtpAccessCode: otp,
      PhoneE164Format: '+44' + phoneNumber,
    });
    
  }
   



}