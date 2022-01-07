import React, {MouseEventHandler, useCallback, useState} from 'react';
import {throttle} from 'lodash';

// Constants, Types & Interfaces
import {THROTTLE_TIME} from '@global/constants';

export interface WithIsHoverProps {
  isHover?: Boolean;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
}

export function withIsHover<T>(WrappedComponent: React.ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithTheme = (props: T) => {
    const [isHover, isHoverSet] = useState<boolean>(false);

    const changeIsHover = throttle((value: boolean) => isHoverSet(value), THROTTLE_TIME);

    const handleMouseEnter = useCallback(() => changeIsHover(true), [changeIsHover]);
    const handleMouseLeave = useCallback(() => changeIsHover(false), [changeIsHover]);

    return (
      <WrappedComponent
        isHover={isHover}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...(props as T)}
      />
    );
  };

  ComponentWithTheme.displayName = `withIsHover(${displayName})`;

  return ComponentWithTheme;
}

export default withIsHover;
