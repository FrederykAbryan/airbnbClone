import { EventMapBase, NavigationState, ParamListBase, StackNavigationState } from "@react-navigation/native";
import {
    // Import the creation function
    createStackNavigator,
    StackNavigationEventMap,
    // Import the types
    StackNavigationOptions,
} from "@react-navigation/stack";

import { withLayoutContext } from "expo-router";

const { Navigator } = createStackNavigator();

// This can be used like `<JsStack />`
export const JsStack = withLayoutContext<
    StackNavigationOptions,
    typeof Navigator,
    StackNavigationState<ParamListBase>,
    StackNavigationEventMap
    // NavigationState<ParamListBase>,
    // EventMapBase
>(Navigator);