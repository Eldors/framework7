import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs, emit } from '../utils/utils';
import { colorClasses } from '../utils/mixins';
import { useTheme } from '../utils/use-theme';

import Link from './link';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  backLink? : boolean | string;
  backLinkUrl? : string;
  backLinkForce? : boolean;
  backLinkShowText? : boolean;
  sliding? : boolean;
  COLOR_PROPS
  onBackClick? : (event?: any) => void;
  onClickBack? : (event?: any) => void;
*/

const NavLeft = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    backLink,
    backLinkUrl,
    backLinkForce,
    backLinkShowText,
    sliding,
  } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const onBackClick = (event) => {
    emit('backClick clickBack', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const theme = useTheme();

  let linkEl;
  let needBackLinkText = backLinkShowText;
  if (typeof needBackLinkText === 'undefined') needBackLinkText = !theme.md;

  if (backLink) {
    const text = backLink !== true && needBackLinkText ? backLink : undefined;
    linkEl = (
      <Link
        href={backLinkUrl || '#'}
        back
        icon="icon-back"
        force={backLinkForce || undefined}
        className={!text ? 'icon-only' : undefined}
        text={text}
        onClick={onBackClick}
      />
    );
  }
  const classes = classNames(
    className,
    'left',
    {
      sliding,
    },
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {linkEl}
      {children}
    </div>
  );
});

NavLeft.displayName = 'f7-nav-left';

export default NavLeft;
