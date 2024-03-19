import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ComponentType } from 'react';


export class TabScreen {
    name: string;
    component: ComponentType<any>;

    constructor(name: string, component: ComponentType<any>)
    {
        this.name = name;
        this.component = component;
    }
}

type TabHeaderProps = {
    screens: TabScreen[]
};

export default function TabHeader(props: TabHeaderProps)
{
    const Tab = createMaterialTopTabNavigator();
    
    return (
        <Tab.Navigator>
            {props.screens.map((tabScreen) => (
                <Tab.Screen
                    key={tabScreen.name}
                    name={tabScreen.name}
                    component={tabScreen.component}
                />
            ))}
        </Tab.Navigator>
    );
}