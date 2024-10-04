import { ITransilation, TransInitailValue } from "./GeneralInterface";
import axios from ".././api";
import { FormInstance } from "antd/lib";
import { ChangeEvent } from "react";


export const Translate = (e: ChangeEvent<HTMLInputElement>, form: FormInstance) => {

    const itemEn = e.target.id.split('_')[1] + "En";
    const Trans: ITransilation = { ...TransInitailValue, text: e.target.value }

    axios.post('/Translation/translate', Trans)
        .then(res => {
            form.setFieldValue(itemEn, res.data)
        });



}
export const TranslateToAR = (e: ChangeEvent<HTMLInputElement>,form :FormInstance) => {

    const item = e.target.id.split('_')[1].replace("En", "");
    const Trans: ITransilation = { ...TransInitailValue, sl: "en", tl: "ar", text: e.target.value }
    axios.post('/Translation/translate', Trans)
        .then(res => {

            form.setFieldValue(item, res.data)
        });
}


export const TranslateTextArea = (e: ChangeEvent<HTMLTextAreaElement>, form: FormInstance) => {

    const itemEn = e.target.id.split('_')[1] + "En";
    const Trans: ITransilation = { ...TransInitailValue, text: e.target.value }

    axios.post('/Translation/translate', Trans)
        .then(res => {
            form.setFieldValue(itemEn, res.data)
        });



}
export const TranslateToARTextArea = (e: ChangeEvent<HTMLTextAreaElement>, form: FormInstance) => {

    const item = e.target.id.split('_')[1].replace("En", "");
    const Trans: ITransilation = { ...TransInitailValue, sl: "en", tl: "ar", text: e.target.value }
    axios.post('/Translation/translate', Trans)
        .then(res => {

            form.setFieldValue(item, res.data)
        });
}


export const DataIndexValue = (arlang:boolean,ColName: string, Obj:any) => {

    return Obj[(arlang ? ColName : ColName + "En")];
}
export const DataIndex = (arlang:boolean,ColName: string) => {

    return arlang ? ColName : ColName + "En";
}



export const TranslateWordToEn = async (text:string) => {

    
    const Trans: ITransilation = { ...TransInitailValue, text: text }

  const data=await  axios.post('/Translation/translate', Trans)
        .then(res => {
           
             return res.data
        });

    return Promise.resolve(data);
}
export const TranslateWordToAr =async (text: string) => {


    const Trans: ITransilation = { ...TransInitailValue, sl: "en", tl: "ar", text: text}

   const data= await axios.post('/Translation/translate', Trans)
        .then(res => {
            return res.data
        });

    return Promise.resolve( data);

}