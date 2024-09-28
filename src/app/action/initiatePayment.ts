"use server"
import axios from "axios"

//Ensure that the authorization header follows the format: "Bearer YOUR_SECRET_KEY". Ex. 'Authorization: Bearer sk_123456789'
//Ensure that you're passing your amount correctly. It should be a number greater than zero, with no decimal places

export async function payForGoods (email: string, amount: string){
    const baseURL = "https://api.paystack.co/transaction/initialize"
    const paymentParams = {email, amount}
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'sk_test_32e979ffc03b6e79ca61dbd2c6c4877316d1c82e'
      }

    try {
        const response = await axios.post(baseURL, paymentParams, { headers: headers});
        if(response.status !== 200) {
            throw new Error("Initiating transaction failed");
        }

        return {success: true, data:response.data}
    } catch (error) {
        if (axios.isAxiosError(error) && error.response){
            // handle specific API errors if available
            return {
                success: false,
                error: error.response.data || "Login failed"
            }
        }
        console.error("Login error", error);
        return { success: false, error: "Login failed"}
    }
}