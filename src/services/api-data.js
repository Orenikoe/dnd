import { api } from "../app-consts"
import axios from "axios"


export const ProductAPI = {
  postUser: async function (phoneNumber) {
    phoneNumber = phoneNumber.substring(1)
    const response = await axios.post(`${api.BASE_URL}/login/otp`, {
      PhoneCountryPrefix: '+44',
      PhoneLocalNumber: '0' + phoneNumber,
      PhoneE164Format: '+447888418915',
      FirstName: '',
      LastName: '',
      Type: 2,
    });
    console.log(response.data);
  },

  registerUser: async function (phoneNumber) {
    console.log(phoneNumber)
    phoneNumber = phoneNumber.substring(1)
    const response = await axios.post(`${api.BASE_URL}/login/otp`, {
      PhoneCountryPrefix: '+44',
      PhoneLocalNumber: '0' + phoneNumber,
      PhoneE164Format: '+44' + phoneNumber,
      FirstName: '',
      LastName: '',
      Type: 1,
    });
    console.log(response.data);
  },

  login: async function (phoneNumber, otp) {
    console.log(phoneNumber)
    console.log(otp)
    const response = await axios.post(`${api.BASE_URL}/login/verify`, {
      OtpAccessCode: otp,
      PhoneE164Format: '+44' + phoneNumber,
    });
    
  }
   



}