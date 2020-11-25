import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import bemCssModules from 'bem-css-modules';

import Modal from '../Modal/Modal';
import { default as LoginFormStyle } from './LoginForm.module.scss';
import { verifyUser } from '../../store/data/users';

const style = bemCssModules(LoginFormStyle);

const LoginForm = ({ handleOnClose, isModalOpen }) => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [validateMessage, setValidateMessage] = useState('');

  const { setUser } = useContext(StoreContext);

  const handleOnChangeLogin = ({ target }) => setLogin(target.value);
  const handleOnChangePassword = ({ target }) => setPassword(target.value);
  const handleOnCloseModal = event => {
    event.preventDefault();
    handleOnClose();
  };

  const resetStateOfInputs = () => {
    setLogin('');
    setPassword('');
    setValidateMessage('');
  };

  const handleOnSubmit = async event => {
    event.preventDefault();

    const loginConfirmation = verifyUser(login, password);
    if (loginConfirmation) {
      setUser(loginConfirmation);
      resetStateOfInputs();
      handleOnClose();
    } else {
      setValidateMessage('Błędne dane');
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      resetStateOfInputs();
    };
  }, [isModalOpen]);

  const validateMessageComponent = validateMessage.length
    ? <p className={style('validate-message')}>{validateMessage}</p>
    : null;

  return (
    <Modal isOpen={isModalOpen} handleOnClose={handleOnClose} shouldBeClosedOnOutsideClick={true}>
      {validateMessageComponent}
      <form className={style()} method="post" onSubmit={handleOnSubmit}>
        <div className={style('row')}>
          <label>
            Login:
            <input onChange={handleOnChangeLogin} type="text" value={login} />
          </label>
        </div>
        <div className={style('row')}>
          <label>
            Hasło:
            <input onChange={handleOnChangePassword} type="password" value={password} />
          </label>
        </div>
        <div className={style('row')}>
          <button className={style('button')} type="submit">Zaloguj</button>
          <button className={style('button')} onClick={handleOnCloseModal} type="button">Anuluj</button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;