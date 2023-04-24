import style from './CreateDog.module.css';
import validations from './validations';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createDogs } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const CreateDog = () => {

    let idTemperaments = 1;

    const [valueDatos, setDatos] = useState({
        name: '',
        image: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        lifespanMin: '',
        lifespanMax: '',
        temperaments: []
    });

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        height: '',
        weight: '',
        lifespan: '',
        temperaments: ''
    });

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);

    const handleChangeInputs = (element) => {
        setDatos({
            ...valueDatos,
            [element.target.name]: element.target.value
        });
        validations({...valueDatos,
            [element.target.name]: element.target.value}, errors, setErrors)
    }

    const handleCheckTemperaments = (element) => {
        if(element.target.checked){
            setDatos({
                ...valueDatos,
                temperaments: [...valueDatos.temperaments, element.target.value]
            })
        }else{
            setDatos({
                ...valueDatos,
                temperaments: valueDatos.temperaments.filter(temperament => temperament !== element.target.value)
            })
        }
    }

    const handlerValidation = (event) => {
        event.preventDefault();
        if(
            errors.name || 
            errors.image || 
            errors.height || 
            errors.weight ||
            errors.lifespan ||
            errors.temperaments 
        ) return alert('Complete all inputs for create the dog.')
        else if(
            !valueDatos.name || 
            !valueDatos.image || 
            !valueDatos.minHeight || 
            !valueDatos.maxHeight || 
            !valueDatos.minWeight || 
            !valueDatos.maxWeight ||
            !valueDatos.lifespanMin ||
            !valueDatos.lifespanMax ||
            !valueDatos.temperaments.length
        ) return alert('Complete all inputs for create the dog.') 
        handlerSubmit()
    }
    
    const navigate = useNavigate();
    const handlerSubmit = () => {
        const temperamentsData = valueDatos.temperaments.map(id => parseInt(id))
        const dogData = {
            Image: valueDatos.image,
            Name: valueDatos.name,
            Height: `${valueDatos.minHeight} - ${valueDatos.maxHeight}`,
            Weight: `${valueDatos.minWeight} - ${valueDatos.maxWeight}`,
            Life_span: `${valueDatos.lifespanMin} - ${valueDatos.lifespanMax} years`,
            Temperaments: [...temperamentsData]
        }
        dispatch(createDogs(dogData));
        setDatos({
            name: '',
            image: '',
            minHeight: '',
            maxHeight: '',
            minWeight: '',
            maxWeight: '',
            lifespanMin: '',
            lifespanMax: '',
            temperaments: []
        })
        alert('Dog created successfully.')
        navigate('/home');
    }

    return(
        <div className={style.container}>
            <div className={style.nav}>
                <Link to='/home'>
                    <button>Go Back</button>
                </Link>
            </div>
            <form onSubmit={event => handlerValidation(event)} className={style.formCont}>
                <h1>
                    Create your Breed
                </h1>
                <div className={style.contFather}>
                
                {/*TEMPERAMENTOS*/}
                <div className={style.contLeft}>
                    <h2>Temperaments</h2>
                    <div className={style.contTemperaments}>
                        {
                            temperaments.map((temperament) => {
                                return(
                                    temperament && 
                                    <div className={style.temperaments}>
                                        <input id={idTemperaments++} value={idTemperaments-1} name='temperaments' type="checkbox" onChange={element => handleCheckTemperaments(element)}/>
                                        <label htmlFor={idTemperaments-1}>{temperament}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


                <div className={style.contRight}>
                    <div className={style.nameImage}>
                        <div className={style.divContInput}>
                            <input id='name' name='name' type="text" value={valueDatos.name} onChange={element => handleChangeInputs(element)} className={errors.name ? style.inputError : style.input} autoComplete='off'/>
                            <label htmlFor="name" className={style.label}>Enter the breed name:</label>
                            <p className={style.err}>{errors.name}</p>
                        </div>
                        <div className={style.divContInput}>
                            <input name='image' type="text" value={valueDatos.image} onChange={element => handleChangeInputs(element)} className={errors.image ? style.inputError : style.input}/>
                            <label htmlFor="image" className={style.label}>Enter a image of the breed:</label>
                            <p className={style.err}>{errors.image}</p>
                        </div>
                    </div>
                    <div className={style.height}>
                        <div className={style.divContInput}>
                            <input name='minHeight' type="number" value={valueDatos.minHeight} onChange={element => handleChangeInputs(element)} className={errors.height ? style.inputError : style.input}/>
                            <label htmlFor="minHeight" className={style.label}>Min Height:</label>
                        </div>
                        <div className={`${style.divContInput} ${style.separador}`}>-</div>
                        <div className={style.divContInput}>
                            <input name='maxHeight' type="number" value={valueDatos.maxHeight} onChange={element => handleChangeInputs(element)} className={errors.height ? style.inputError : style.input}/>
                            <label htmlFor="maxHeight" className={style.label}>Max Height:</label>
                            <p className={style.err}>{errors.height}</p>
                        </div>
                    </div>
                    <div className={style.weight}>
                        <div className={style.divContInput}>
                            <input name='minWeight' type="number" value={valueDatos.minWeight} onChange={element => handleChangeInputs(element)} className={errors.weight ? style.inputError : style.input}/>
                            <label htmlFor="minWeight" className={style.label}>Min Weight:</label>
                        </div>
                        <div className={`${style.divContInput} ${style.separador}`}>-</div>
                        <div className={style.divContInput}>
                            <input name='maxWeight' type="number" value={valueDatos.maxWeight} onChange={element => handleChangeInputs(element)} className={errors.weight ? style.inputError : style.input}/>
                            <label htmlFor="maxWeight" className={style.label}>Max Weight:</label>
                            <p className={style.err}>{errors.weight}</p>
                        </div>
                    </div>
                    <div className={style.lifespan}>
                        <div className={style.divContInput}>
                            <input name='lifespanMin' type="number" value={valueDatos.lifespanMin} onChange={element => handleChangeInputs(element)} className={errors.lifespan ? style.inputError : style.input}/>
                            <label htmlFor="lifespanMin" className={style.label}>Life Span:</label>
                        </div>
                        <div className={`${style.divContInput} ${style.separador}`}>-</div>
                        <div className={style.divContInput}>
                            <input name='lifespanMax' type="number" value={valueDatos.lifespanMax} onChange={element => handleChangeInputs(element)} className={errors.lifespan ? style.inputError : style.input}/>
                            <label htmlFor="lifespanMax" className={style.label}>To:</label>
                            <p className={style.err}>{errors.lifespan}</p>
                        </div>
                    </div>
                    <button>Create Dog :3</button>
                </div>
                </div>
            </form>
        </div>
    );
};

export default CreateDog;