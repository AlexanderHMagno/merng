module.exports.ValidateUserInput = (username, email, password, confPassword) => {

    
    const emailREGEX =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let errors = {}

    if (username.trim() === '' || username.length < 5) {
        errors.username = "Username must be a string with minimum 5 characters "
    }

    if (email.trim() === '' || !email.match(emailREGEX)) {
        errors.email = 'Must be a valid email'
    }

    if (password.trim() === '' || password.length < 5) {
        errors.password = 'Password must be min 5 characteres';        
    } else if (password !== confPassword ){
        errors.password = 'Passwords must be match '
    }
    
    return {
        errors,
        valid : Object.keys(errors).length < 1
    }
}




module.exports.AuthUserInput = (username, password) => {

    const errors = {};

    if (username.trim() === '' || username.length < 5) {
        errors.username = "Username must be a string with minimum 5 characters "
    }

    if (!password.trim()) {
        errors.password = 'Password too short.'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}