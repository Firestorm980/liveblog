import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';

const Children = ({ name, avatar }) => {
  const spanStyle = {
    alignItems: 'center',
    display: 'flex',
  };
  const avatarStyle = {
    display: 'inline-block',
    height: '1.5em',
    marginRight: '.25em',
    width: '1.5em',
  };

  return (
    <span style={spanStyle}>
      { (avatar) ? <div style={avatarStyle} dangerouslySetInnerHTML={{ __html: avatar }} /> : null }
      { name }
    </span>
  );
};

const AuthorSelectOption = (props) => {
  const propsUpdated = {
    ...props,
    children: <Children {...props.data} />,
  };

  return (
    <components.Option {...propsUpdated} />
  );
};

AuthorSelectOption.propTypes = {
  innerProps: PropTypes.object,
  innerRef: PropTypes.object,
  isDisabled: PropTypes.bool,
  data: PropTypes.object,
};

Children.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
};

export default AuthorSelectOption;
