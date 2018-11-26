import React from 'react';
import { ToggleModes } from '../../utils/constants';
import { ToggleButton, Tooltip, OverlayTrigger } from 'react-bootstrap';

const Toggle = function(props) {
  const tooltip = <Tooltip id={props.name}>{ToggleModes[props.name].desc}</Tooltip>
  return (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <ToggleButton type="checkbox"
        key={ToggleModes[props.name].value}
        value={ToggleModes[props.name].name}
        name="modes"
        bsStyle={props.checked ? "success" : "default"}
        checked={props.checked}
        onChange={() => props.onChange(props.name)}>
        {ToggleModes[props.name].name}
      </ToggleButton>
    </OverlayTrigger>
  );
};

export default Toggle;
