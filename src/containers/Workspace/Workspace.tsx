import React, {Children} from 'react';
import './Workspace.scss';

export interface WorkspaceProps {
  children?: JSX.Element | JSX.Element[];
}

function Workspace({children}: WorkspaceProps) {
  return <main className="workspace">{Children.map(children, child => child)}</main>;
}

export default Workspace;
