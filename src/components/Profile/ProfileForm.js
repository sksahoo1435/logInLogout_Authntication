import { useRef,useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {

  const history = useHistory();

  const newPasswordInputRef = useRef();

  const passCtx = useContext(AuthContext);

  const submitHandler=(event)=>{
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD7zBQf0px6OU6KOmQsl6htUKcMzlm5EWk',{
      method:'POST',
      body:JSON.stringify({
        idToken:passCtx.token,
        password:enteredNewPassword,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>{
        console.log(res);
        history.replace('/auth')

    });

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='5' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
