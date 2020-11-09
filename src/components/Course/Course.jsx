import React, { useContext } from 'react';



import { default as CoursesStyles } from './Course.module.scss';
import request from '../../helpers/request';
import { StoreContext } from '../../store/StoreProvider';

import bemCssModules from 'bem-css-modules';
import { useHistory } from 'react-router-dom';
const style = bemCssModules(CoursesStyles);


const Course = ({ authors, id, isUserContext = false, img, price, title }) => {

  const { user, setUser } = useContext(StoreContext);
  const history = useHistory();

  const allAuthors = authors.join(', ');
  const isUserLogged = Boolean(user);


  const handleOnClick = async () => {
    try {
      const { data, status } = await request.patch(
        '/users',
        {
          login: user.login,
          courseId: id,

        }
      );
      if (status === 202) {
        setUser(data.user);
        history.push('/my-courses');
      }

    } catch (error) {
      console.warn(error)
    }
  }

  const shouldButtonBeVisible = isUserLogged && !isUserContext;

  return (
    <li>
      <article className={style()}>
        <h3 className={style('title')} >{title}</h3>
        <img src={img} alt={title} className={style('image')} />
        <p className={style('price')}>{`Koszt kursu: ${price}zł`} </p>
        <p className={style('authors')}>{`Autorzy kursu ${allAuthors}`} </p>
        {shouldButtonBeVisible && <button onClick={handleOnClick}>Zakup ten kurs</button>}
      </article>
    </li>
  )
};

export default Course;