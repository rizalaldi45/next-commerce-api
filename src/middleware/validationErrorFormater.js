const validationFormater = ({errors, name}) => {
    let error = []
    if (name.includes('ValidationError')) {
        for (const property in errors) {
            error.push({text: errors[property].message, field: property})
        }
        return {message: error}
    } else {
        return {message: 'Internal Server Error'}
    }
}

module.exports = validationFormater;