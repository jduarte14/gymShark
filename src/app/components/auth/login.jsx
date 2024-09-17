import { MaterialIcons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useState } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions, Pressable, Modal, TouchableOpacity, Image} from "react-native";
import StepFields from "./../stepFields";
import { sportData, facilitiesData, schedulesData, pricesData, galleryData, infoForm} from "./../../../data/gymData";

const Login = () => {
  const [action, setAction] = useState("login");
  const [modal, setModal] = useState(true);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const handleStep = (direction) => {
    setStep((prevStep) => {
      let newStep;
      if (direction === "next" && prevStep < 5) {
        newStep = prevStep + 1;
      } else if (direction === "back" && prevStep >= 0) {
        newStep = prevStep - 1;
      }

      setProgress((prevProgress) => ({
        ...prevProgress,
        [newStep]: 0,
        [prevStep]: newStep > prevStep ? 1 : 0,
      }));

      return newStep;
    });
  };

  const getStepData = () => {
    switch (step) {
      case 0:
        return { tag: sportData.tag, fields: sportData.items, name: sportData.name };
      case 1:
        return { tag: facilitiesData.tag, fields: facilitiesData.items, name: facilitiesData.name };
      case 2:
        return { tag: schedulesData.tag, fields: schedulesData.items, name: schedulesData.name };
      case 3:
        return { tag: pricesData.tag, fields: pricesData.items, name: pricesData.name };
      case 4:
        return { tag: galleryData.tag, fields: galleryData.items, name: galleryData.name };
      case 5:
        return { tag: infoForm.tag, fields: infoForm.items, name: infoForm.name };
      default:
        return { tag: sportData.tag, fields: sportData.items, name: sportData.name };
    }
  };

  const handleActions = () => {
    switch (action) {
      case "userRegister":
        return "";
      case "instructorLogin":
        return setAction("instructorLogin");
      case "instructorRegister":
        return setAction("instructorRegister");
      case "ownerLogin":
        return setAction("ownerLogin");
      case "ownerRegister":
        return setAction("ownerRegister");
      case "gallery_form":
        return setAction("gallery_form");
      case "prices_form":
        return setAction("prices_form");
      case "info_form":
        return setAction("info_form");
      default:
        return setStep(0);
    }
  };

  const handleAuth = async (action) => {};

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("./../../../img/logo_white.png")}
      ></Image>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          onChangeText=""
          placeholderTextColor="white"
          value=""
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText=""
          value=""
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>
              {action === "login" ? "Login" : "Register"}
            </Text>
          </Pressable>
        </View>
        <Text style={styles.infoText}>You don't have an account? Register</Text>
        <View style={styles.buttonWrap}>
          <Pressable style={styles.buttonWrapped}>
            <Text style={styles.buttonText}>I'm an instructor</Text>
          </Pressable>
          <Pressable
            style={styles.buttonWrapped}
            onPress={() => handleActions("ownerRegister")}
          >
            <Text style={styles.buttonText}>I'm a gym owner</Text>
          </Pressable>
        </View>
      </View>
      {modal && (
        <Modal animationType="slide" visible={modal}>
          <View style={styles.modal}>
            <Text style={styles.centeredTitle}>Choose your activities</Text>
            <View style={{ height: 400 }}>
              {
                <StepFields
                  tag={getStepData().tag}
                  fields={getStepData().fields}
                  fieldName={getStepData().name}
                />
              }
            </View>
            <View style={styles.row}>
              {Object.keys(progress).map((key) => (
                <Progress.Bar
                  key={key}
                  progress={progress[key.items]}
                  width={screenWidth / 10}
                  height={10}
                  borderColor="#2b2e37"
                  color="#51565b"
                  style={styles.progress}
                />
              ))}
            </View>
            <View style={styles.navigationRow}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  handleStep("back");
                }}
              >
                <MaterialIcons name="navigate-before" size={45} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  handleStep("next");
                }}
              >
                <MaterialIcons name="navigate-next" size={45} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Login;

let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: screenHeight - 30,
  },
  row: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  modal: {
    flex: 1,
    backgroundColor: backgroundBase,
    height: screenHeight,
    alignItems: "center",
    justifyContent: "space-around",
  },
  logo: {
    marginTop: 30,
    width: 250,
    height: 150,
    marginBottom: 40,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    paddingVertical: 35,
  },
  centeredTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
  form: {
    paddingTop: 10,
  },
  input: {
    width: screenWidth - 30,
    height: 55,
    borderWidth: 2,
    borderColor: backgroundSecondBase,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 15,
    paddingLeft: 20,
    fontWeight: "bold",
    color: "white",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  touchable: {
    backgroundColor: backgroundSecondBase,
    padding: 2,
    borderWidth: 2,
    borderColor: "#51565b",
    borderRadius: 15,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  buttonWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2b2e37",
    borderWidth: 2,
    borderColor: backgroundSecondBase,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 25,
    width: screenWidth - 50,
  },
  buttonWrapped: {
    marginHorizontal: 10,
    backgroundColor: "#2b2e37",
    borderWidth: 2,
    borderColor: backgroundSecondBase,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  text: {
    color: "white",
    paddingTop: 10,
    textAlign: "center",
  },
  infoText: {
    paddingVertical: 15,
    textAlign: "center",
    color: "white",
  },
  progress: {
    margin: 5,
  },
});
