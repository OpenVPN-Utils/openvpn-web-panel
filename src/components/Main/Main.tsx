import React, {FC} from 'react';
import * as style from './Main.module.css'
import {useAppDispatch, useAppSelector} from "../../store/store";

const Main: FC = (props) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <div className={style.block}>
        <h1>{123}</h1>
      </div>
  );
}

export default Main;