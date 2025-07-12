import { icons } from "@/constants/icons";
import { useSavedMovies } from "@/store/SavedMovies";
import { useRouter } from "expo-router";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const Saved = () => {
  const { savedMovies } = useSavedMovies();
  const router = useRouter();

  if(savedMovies.length === 0) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-10">
         <View className="flex justify-center items-center flex-1 gap-5">
          <Image source={icons.save} className="size-10" tintColor="#fff"  />
          <Text className="text-gray-500 text-base">
            No saved movies yet
          </Text>
         </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1 px-5 pt-11">
      {/* Fix typo: fo nt-bold -> font-bold */}
      <Text className="text-lg text-white font-bold mb-6">
        Saved Movies
      </Text>
      <FlatList 
        data={savedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => router.push(`/movies/${item.id}`)}
            className="flex-row items-center mb-5"
          >
            <Image 
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
              className="w-20 h-28 rounded"
            />
            <Text className="text-white ml-4 text-lg font-semibold" numberOfLines={1}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Saved;
