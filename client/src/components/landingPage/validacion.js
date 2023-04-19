
const validacion = (username, error, setError) => {
    if(!username.username) setError({...error, username: "Please complete the space"});
    else if(username.username.length > 10) setError({ ...error, username: "Name too long" });
    else setError({ ...error, username: "" });
};

export default validacion;