import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import * as Haptics from 'expo-haptics';

const categories = [
    {
        name: 'Tiny homes',
        icon: 'home',
    },
    {
        name: 'Cabins',
        icon: 'house-siding',
    },
    {
        name: 'Trending',
        icon: 'local-fire-department',
    },
    {
        name: 'Play',
        icon: 'videogame-asset',
    },
    {
        name: 'City',
        icon: 'apartment',
    },
    {
        name: 'Beachfront',
        icon: 'beach-access',
    },
    {
        name: 'Countryside',
        icon: 'nature-people',
    },
];

type Props = {
    onCategoryChanged: (category: string) => void;
}
const ExploreHeader = ({onCategoryChanged}: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0)
    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index]
        setActiveIndex(index)
        scrollRef.current?.scrollTo({ x: 40 * index, y: 0, animated: true })
        // selected?.measure((x) => {
        // })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(categories[index].name)
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', ...defaultStyles.droidSafeArea }} >
            <View style={styles.container}>
                <View style={{ paddingTop: 20, ...styles.actionRow }}>
                    <Link href={'/(modals)/booking'} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name='search' size={24} />
                            <View>
                                <Text style={{ fontFamily: 'mon-sb' }}>Where to ?</Text>
                                <Text style={{ fontFamily: 'mon', color: Colors.grey }}>Anywhere, Any week</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name='options-outline' size={24} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    ref={scrollRef}
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center', gap: 20, paddingHorizontal: 16, flexGrow:1 }}>
                    {categories.map((category, i) => (
                        <TouchableOpacity
                            key={i}
                            ref={(el) => itemsRef.current[i] = el}
                            style={activeIndex === i ? styles.categoriesBtnActive : styles.categoriesBtn}
                            onPress={() => selectCategory(i)}
                        >
                            <MaterialIcons name={category.icon as any} size={24} color={activeIndex === i ? "#000" : Colors.grey} />
                            <Text style={activeIndex === i ? styles.categoryTextActive : styles.categoryText}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ExploreHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        position: 'relative',
        height: 160,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
    },

    searchBtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        padding: 14,
        alignItems: 'center',
        width: 280,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c2c2c2',
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#A2A0A2',
        borderRadius: 24,
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: Colors.grey,
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: '#000',
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
});