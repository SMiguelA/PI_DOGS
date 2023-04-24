
const validations = (dogData, errors, setErrors) => {
    if(!/^[^0-9]*$/.test(dogData.name)) setErrors({ 
        ...errors, 
        name:'Cant contain numbers' 
    });
    else if(dogData.name > 30) setErrors({
        ...errors, 
        name:'Name to large' 
    })
    else if(dogData.image && !/\.(gif|jpe?g|png|webp)$/i.test(dogData.image)) setErrors({ 
        ...errors, 
        name:'',
        image: 'Must be a image URL'
    })
    else if(dogData.maxHeight && dogData.minHeight > dogData.maxHeight) setErrors({
        ...errors,
        name:'',
        image:'',
        height:"Can't be less than min height"  
    })
    else if(dogData.maxWeight && dogData.minWeight > dogData.maxWeight) setErrors({ 
        ...errors,
        name:'',
        image:'',
        height:'',
        weight:"Can't be less than min weight"
    })
    else if(dogData.lifespanMax && dogData.lifespanMin > dogData.lifespanMax) setErrors({ 
        ...errors,
        name:'',
        image:'',
        height:'',
        weight:'',
        lifespan:"Can't be less than life span from"
    })
    else setErrors({
        ...errors,
        name:'',
        image:'',
        height:'',
        weight:'',
        lifespan:''
    })
};

export default validations;