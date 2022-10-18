import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import CalorieNinjas from "../apis/CalorieNinjas";

function Diary({ navigation }) {
  const [calNinjaVisible, setCalNinjaVisible] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toDateString());
    navigation.setOptions({ title: date + " Diary" });
  }, []);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < foodList.length; i++) {
      total += parseInt(foodList[i].calories, 10);
    }
    setTotalCalories(total);
  }, [foodList]);

  function openCalNinja() {
    setCalNinjaVisible(true);
  }
  function closeCalNinja() {
    setCalNinjaVisible(false);
  }
  function addFoodItem(foodItem) {
    setFoodList((currentFoods) => {
      return [foodItem, ...currentFoods];
    });
  }
  const renderItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.calories}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.diaryContainer}>
      <Text style={styles.text}>Diary For {date}</Text>
      <TouchableOpacity style={styles.addFoodBttn} onPress={openCalNinja}>
        <Text>Add Food</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.foodFlatList}
        data={foodList}
        renderItem={renderItem}
      />
      <Text style={styles.text}> Total Calories:{totalCalories}</Text>
      <Modal visible={calNinjaVisible} animationType={"slide"}>
        <CalorieNinjas onCancel={closeCalNinja} addFoodItem={addFoodItem} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  diaryContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  addFoodBttn: {
    backgroundColor: "#fb5b5a",
    width: "80%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  foodItem: {
    backgroundColor: "#fb5b5a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
  },
  text: {
    fontSize: 15,
    color: "white",
  },
  foodFlatList: {
    borderWidth: 2,
    borderColor: "red",
    width: "90%",
  },
});
export default Diary;
