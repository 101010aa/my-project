import { icons } from "@/constants/icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", 
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 gap-5">
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-32 h-32 rounded-full"
            resizeMode="cover"
          />
        ) : (
          <Image source={icons.person} className="size-20" tintColor="#fff" />
        )}

        <TouchableOpacity
          className="bg-white p-3 rounded-lg w-full"
          onPress={pickImageFromGallery}
        >
          <Text className="text-center text-black font-semibold">
            Choose from Gallery
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white p-3 rounded-lg w-full"
          onPress={takePhotoWithCamera}
        >
          <Text className="text-center text-black font-semibold">
            Take a Photo
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
