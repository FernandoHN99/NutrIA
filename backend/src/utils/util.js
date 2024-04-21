import axios from 'axios';
export default class Util {


    static async sendRequestPOST(strRequest, jsonData={}, jsonHeader={}) {
        try {
            const response = await axios.post(strRequest, jsonData, {headers: jsonHeader});
            return {status: true, msg: 'Sucesso', data: response.data};
        }catch (error) {
            return {status: false, msg: `${error}`};
        }
    }

    static async sendRequestGET(strRequest, jsonHeader={}, jsonParams={}) {
        try {
            const response = await axios.get(strRequest, {params: jsonParams, headers: jsonHeader});
            return {status: true, msg: 'Sucesso', data: response.data};
        }catch (error) {
            return {status: false, msg: `${error}`};
        }
    }

    static async sendRequest(jsonRequest) {
        try {
            let response =  await axios(jsonRequest);
            return {status: true, msg: 'Sucesso', data: response.data};
        }catch (error) {
            return {status: false, msg: `${error}`};

        }
    }

    static generateRandomString (length) {
        let text = '';
        let possible ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
}


