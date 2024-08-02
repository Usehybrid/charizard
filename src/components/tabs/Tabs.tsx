import React, { ReactElement } from 'react';
import clsx from 'clsx';
import classes from './styles.module.css';

interface TabsProps {
  id: string;
  activeKey: string;
  onSelect: (key: string) => void;
  customClassName?: string;
  customStyles?: React.CSSProperties;
  children: ReactElement[];
}

export const Tabs: React.FC<TabsProps> = ({
  id,
  activeKey,
  onSelect,
  children,
  customClassName = '',
  customStyles = {},
}) => {
  const handleTabChange = (key: string) => {
    onSelect(key);
  };

  return (
    <div id={id} className={clsx(classes.tabs, customClassName)} style={customStyles}>
      <div className={classes.tabBar}>
        {React.Children.map(children, (child: React.ReactElement) =>
          React.cloneElement(child, {
            isActive: child.props.eventKey === activeKey,
            onClick: () => handleTabChange(child.props.eventKey),
          })
        )}
      </div>
      <div className={classes.tabContent}>
        {React.Children.map(children, (child: React.ReactElement) =>
          child.props.eventKey === activeKey ? child.props.children : null
        )}
      </div>
    </div>
  );
};
