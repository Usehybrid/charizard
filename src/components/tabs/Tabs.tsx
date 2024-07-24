import React, { ReactElement } from "react"
import clsx from "clsx"
// import { TabProps } from "./Tab"
import classes from './styles.module.css'

interface TabsProps {
	id: string
	activeKey: string
	onSelect: (key: string) => void
	customClassName?: string
	customStyles?: React.CSSProperties
	children: ReactElement[]
}

export const Tabs: React.FC<TabsProps> = ({
	id,
	activeKey,
	onSelect,
	children,
	customClassName = '',
	customStyles = {}
}) => {

	const handleTabChange = React.useCallback((key: string) => {
		onSelect(key);
	}, [onSelect]);

	return (
		<div id={id} className={clsx(classes.tabs, customClassName)} style={customStyles}>
			<div className={classes.tabBar}>
				{React.Children.map(children, (child: React.ReactElement, idx) => 
					React.cloneElement(child, {
						isActive: child.props.title === activeKey,
						onClick: () => handleTabChange(child.props.title)
					})
				)}
			</div>
			<div className={classes.tabContent}>
				{
					React.Children.map(children, (child: React.ReactElement) => (
						child.props.title === activeKey ? child.props.children : ''
					))
				}
			</div>
		</div>
	);
};