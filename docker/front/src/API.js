import axios from 'axios';
import StorageData from './StorageData';
import * as Network from 'expo-network';

const ip = "https://gregoriex.fr/api/";

export default class API
{
  static getURL(url)
  {
    return (ip + url);
  }

  static async createHeaders(secured)
  {
    let headers = {
      'Content-Type': "application/json",
    };
    if (secured) {
      let token = (await StorageData.getInstance()).getToken();
      headers['Authorization'] = 'Bearer ' + token;
    }
    return (headers);
  }

  /*
  static parse(data)
  {
    try
    {
      let parse = JSON.parse(data);
      console.log(data);
      return parse;
    }
    catch (e)
    {
      return data;
    }
  }
  */

  /*
  static errorParsing(error) 
  {
    if (typeof error === "string") {
      const a  = error;
      return a;
    } else if (error instanceof Error) {
      return error.message;
    }
    return ("");
  }
  */

  static async securityCheck(secured)
  {
    if (secured === true && await StorageData.getInstance().getToken() == null)
      return [400, "Vous n'êtes pas connecté"];
    if ((await Network.getNetworkStateAsync()) && (await Network.getNetworkStateAsync()).isInternetReachable === false)
      return [400, "Pas connecté à Internet"];
    return [200, ""];
  }

  static async get(url, secured)
  {
    let check = await this.securityCheck(secured);
    if (check[0] !== 200)
      return (check);
    try
    {
      let response = await axios({
        method: 'get',
        url: this.getURL(url),
        headers: await this.createHeaders(secured),
      });
      return [response.status, (response.data)];
    }
    catch (e)
    {
      return [400, e.response];
    }
  }
  
  static async post(url, secured, data)
  {
    let check = await this.securityCheck(secured);
    if (check[0] !== 200)
      return (check);
    try
    {
      let Data = {};
      data.forEach((value, key) => {
        Data[key] = value;
      })
      let response = await axios({
        method: 'post',
        url: this.getURL(url),
        headers: await this.createHeaders(secured),
        data: JSON.stringify(Data),
      });
      return [response.status, (response.data)];
    }
    catch (e)
    {
      return [400, e.response];
    }
  }
};