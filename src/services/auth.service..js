import { api } from "../app-consts"
import axios from "axios"



export const authApi = {


  registerUser: async function (phoneNumber) {
    phoneNumber = phoneNumber.substring(1)
     await axios.post(`${api.BASE_URL}/login/otp`, {
      PhoneCountryPrefix: '+972',
      PhoneLocalNumber: '0' + phoneNumber,
      PhoneE164Format: '+972' + phoneNumber,
      FirstName: 'Johnny',
      LastName: 'Cash',
      Type: 1,
    });
  },

  loginUser: async function (phoneNumber) {
    phoneNumber = phoneNumber.substring(1)
     await axios.post(`${api.BASE_URL}/login/otp`, {
      PhoneCountryPrefix: '+972',
      PhoneLocalNumber: '0' + phoneNumber,
      PhoneE164Format: '+972' + phoneNumber,
      FirstName: 'Johnny',
      LastName: 'Cash',
      Type: 2,
    });
  },

  verifyUser: async function (phoneNumber, otp) {
    phoneNumber = phoneNumber.substring(1)
    console.log(otp)
    console.log(phoneNumber)
    await axios.post(`${api.BASE_URL}/login/verify`, {
      OtpAccessCode: otp,
      PhoneE164Format: '+972' + phoneNumber,
    });
    
  }
   



}