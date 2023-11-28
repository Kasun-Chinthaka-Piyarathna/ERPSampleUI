import axios from 'axios';
import authHeader from './auth-header';

const USERS_URL = 'http://localhost:8080/api/clients';
const QUOTATION_URL = 'http://localhost:8080/api/quotations'


export const createClient = async (
    clientName,
    personName,
    personEmail,
    personMobileNo,
    commercialRegNo,
    commercialReg,
    housing,
    transportation,
    costType,
    profession,
    nationality,
    taskApproval) => {
    return axios.post(USERS_URL + '/create', {
        clientName: clientName,
        personName: personName,
        personEmail: personEmail,
        personMobileNo: personMobileNo,
        commercialRegNo: commercialRegNo,
        commercialReg: commercialReg,
        housing: housing,
        transportation: transportation,
        costType: costType,
        profession: profession,
        nationality: nationality,
        taskApproval: taskApproval
    }, { headers: authHeader() });
}

export const submitQuotation = async (
    quotationLink,
    quotationApproval
) => {
    return axios.post(QUOTATION_URL + '/create', {
        quotationLink: quotationLink,
        quotationApproval: quotationApproval,
    }, { headers: authHeader() });
}
