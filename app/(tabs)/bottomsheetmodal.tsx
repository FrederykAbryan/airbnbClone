import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '@/components/CustomBottomSheetModal';

const Page = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { dismiss } = useBottomSheetModal();

	const handlePresentModalPress = () => bottomSheetRef.current?.present();

	return (
		<View style={styles.container}>
			<CustomBottomSheetModal ref={bottomSheetRef} />
			<Button title="Present Modal" onPress={handlePresentModalPress} />
			<Button title="Dismiss Modal" onPress={() => dismiss()} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center'
	},
	containerHeadline: {
		fontSize: 24,
		fontWeight: '600',
		padding: 20,
		color: '#fff'
	},
	// input: {
	// 	marginTop: 8,
	// 	marginHorizontal: 16,
	// 	marginBottom: 10,
	// 	borderRadius: 10,
	// 	fontSize: 16,
	// 	lineHeight: 20,
	// 	padding: 8,
	// 	backgroundColor: 'rgba(151, 151, 151, 0.25)',
	// 	color: '#fff'
	// }
});

export default Page