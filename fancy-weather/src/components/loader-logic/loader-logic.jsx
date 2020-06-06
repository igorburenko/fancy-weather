import React, {useContext} from 'react';
import Loader from '../loader'
import {StateContext} from '../../contexts/state-context';
import MainScreen from '../main-screen';

const LoaderLogic = () => {

  const [mainState] = useContext(StateContext);

  return (
    <React.Fragment>
      {!(mainState.isReload) ? <MainScreen/> : null}
      {mainState.isReload ? <Loader/> : null}
    </React.Fragment>
  );
};

export default LoaderLogic;
