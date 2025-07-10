import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Dashboard from "../screens/Dashboard";
import Chat from "../screens/Chat";
import VoiceSession from "../screens/VoiceSession";
import Settings from "../screens/TherapistStyleConfig";
import TestStack from './TestStack';
import VoiceSessionsList from "../screens/VoiceSessionList";
import VoiceStack from "./VoiceStack";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#6D28D9",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    paddingTop: 8,
                    paddingBottom: 12,
                    height: 72,
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "Dashboard":
                            iconName = "home-outline";
                            break;
                        case "Chat":
                            iconName = "chatbubble-outline";
                            break;
                        case "Voice":
                            iconName = "mic-outline";
                            break;
                        case "Tests":
                            iconName = "checkbox-outline";
                            break;
                        case "Settings":
                            iconName = "settings-outline";
                            break;
                        default:
                            iconName = "ellipse-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Voice" component={VoiceStack} />
            <Tab.Screen name="Tests" component={TestStack} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};

export default BottomTabs;