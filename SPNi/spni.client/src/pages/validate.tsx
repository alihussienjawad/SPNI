import { RuleObject } from 'antd/lib/form';

 const arabicPattern =  /^[\u0621-\u064A\u0041-\u005A\u0061-\u007A]+(\s+[\u0621-\u064A\u0041-\u005A\u0061-\u007A]+)*$/;
const NumberPattern = /^\d{1,2}$/;
 const minLength = 3;
 
 const maxLength = 100;

export const validateArabicName = (_: RuleObject, value: string) => {

        if (value) {
            if (!arabicPattern.test(value)) {
                return Promise.reject(new Error('الرجاء ادخال حروف  فقط  للاسم'));
            }
            if (value.length < minLength) {
                return Promise.reject(new Error(` يجب ان يحتوي الاسم اكثر من  ${minLength} حروف `));
            }
            if (value.length > maxLength) {
                return Promise.reject(new Error(`  يجب ان يحتوي الاسم اقل من  ${maxLength} حروف `));
            }
           
        }
        return Promise.resolve();
    };


export const validateArabicPosition = (_: RuleObject, value: string) => {

    if (value) {
        if (!arabicPattern.test(value)) {
            return Promise.reject(new Error('الرجاء ادخال حروف  فقط  للمنصب '));
        }
        if (value.length < minLength) {
            return Promise.reject(new Error(` يجب ان يحتوي المنصب اكثر من  ${minLength1} حروف `));
        }
        if (value.length > maxLength) {
            return Promise.reject(new Error(`  يجب ان يحتوي المنصب اقل من  ${maxLength} حروف `));
        }

    }
    return Promise.resolve();
};

 
export const validateTargetScorr = (_: RuleObject, value: string) => {
    if (value) {
        if (NumberPattern.test(value)) {
            return Promise.reject(new Error('الرجاء ادخال حروف فقط للاسم'));
        }
        if (value.length < minLength) {
            return Promise.reject(new Error(`يجب أن يحتوي الاسم على أكثر من ${minLength} حروف`));
        }
        if (value.length > maxLength) {
            return Promise.reject(new Error(`يجب أن يحتوي الاسم على أقل من ${maxLength} حروف`));
        }
    }
    return Promise.resolve();
};
 