import React, {Children} from 'react';

// Style
import './Workspace.scss';

// Types & interfaces
export interface WorkspaceProps {
  children?: JSX.Element | JSX.Element[];
}

function Workspace({children}: WorkspaceProps) {
  return <main className="workspace">{Children.map(children, child => child)}</main>;
}

export default Workspace;
