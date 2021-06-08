import React from 'react';
import { Link, LinkProps, useHistory } from 'react-router-dom'
import * as H from 'history';
import "./common.css"
import { Fab } from '@material-ui/core';
import { ArrowLeft } from '@material-ui/icons';

export const ButtonLink = (props: LinkProps) => {
  return (
    <Link {...props} className="unstyled" />
  )
}

export const GoBackButton = () => {
  const history = useHistory();
  return (
    <Fab color="primary" className="fixed-top" onClick={() => history.goBack()}>
      <ArrowLeft fontSize="large" />
    </Fab>
  )
}