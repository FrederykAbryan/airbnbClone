import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listing'
import listingsData from '@/assets/data/airbnb-listings.json'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsMap from '@/components/ListingsMap'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'

const IndexT = () => {
  const [category, setCategory] = React.useState('Tiny homes');
  const items = useMemo(() => listingsData as any, []);
  const getoItems = useMemo(() => listingsDataGeo, []);
  const onDataChanged = (category: string) => {
    setCategory(category)
  }
  return (
    <View style={{flex: 1, marginTop: 80}}>
      <Stack.Screen
      options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged}/>
      }}
      />
      {/* <Listings listings={items} category={category}/> */}
      <ListingsMap listings={getoItems}/>
      <ListingsBottomSheet listings={items} category={category}></ListingsBottomSheet>
    </View>
  )
}

export default IndexT