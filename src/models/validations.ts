export const userSignValidation = (email:string, cpf:string) => {
    return emailValidate(email) && cpfValidate(cpf);
}

export const userLoginValidation = (email:string) => {
    return emailValidate(email);
}

const emailValidate = (email:string) =>{
    const emailValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailValidate.test(email);
}

const cpfValidate = (cpf:string) =>{
    const cpfValidate = /^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;
    return cpfValidate.test(cpf);
}