import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    FlatList,
    KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
    state = {
        condition: "1",
        totalStudents: [
            "Sparsh Katiyar", "Suarabh Patel"
        ],
        retrievedStudents: [
            {
                "id": 1,
                "name": "Sparsh Katiyar"
            },
            {
                "id": 2,
                "name": "Hardev Goyal"
            },
            {
                "id": 3,
                "name": "Suarabh Patel"
            },
            {
                "id": 4,
                "name": "Vibhas Wahi"
            }
        ],
        markStudents: []
    }
    // const [isShowingCamera, setIsShowingCamera] = useState("1");
    askForPermission = async () => {
        const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
        if (permissionResult.status !== 'granted') {
            Alert.alert('no permissions to access camera!', [{ text: 'ok' }])
            return false
        }
        return true
    }

    justHere = async () => {
        // console.log("HELLLOOO");
        setIsShowingCamera("1");
        // fetch('http://0b0a76c4214a.ngrok.io/api/test')
        // 	.then(res => console.log(res))
        // 	.catch(err => console.log("Here :" + err))
    }

    takeImage = async () => {
        // make sure that we have the permission
        this.setState({
            condition: "2"
        })
        setTimeout(() => {
            this.setState({
                condition: "3"
            })
        }, 1000);
        // markAttendance(retrievedStudents, totalStudents);
        // setIsShowingCamera("2");
        // const hasPermission = await this.askForPermission()
        // if (!hasPermission) {
        // 	return
        // } else {
        // 	// launch the camera with the following settings
        // 	let image = await ImagePicker.launchCameraAsync({
        // 		mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // 		allowsEditing: true,
        // 		aspect: [3, 3],
        // 		quality: 0.3,
        // 		base64: false,
        // 	})

        // 	// make sure a image was taken:
        // 	if (!image.cancelled) {
        // 		this.setState({
        // 			condition: "2"
        // 		})
        // 		fetch('http://269f15da2405.in.ngrok.io/api/test', {
        // 			method: 'POST',
        // 			headers: {
        // 				Accept: 'application/json',
        // 				'Content-Type': 'image/jpg',
        // 			},
        // 			// send our base64 string as POST request
        // 			// body: JSON.stringify({
        // 			// 	imgsource: image.base64,
        // 			// }),
        // 			body: image
        // 		})
        // 			.then(res => {
        // 				var newEl = JSON.parse(JSON.stringify(res))
        // 				console.log(newEl);
        // 				// console.log(newEl._bodyBlob._data);
        // 				// console.log(newEl._bodyInit._data);
        // 				// console.log();
        // 				// console.log(JSON.parse(JSON.stringify(res.body)));

        // 				this.setState({
        // 					condition: "3"
        // 				})
        // 				console.log("Succes : " + res);
        // 			})
        // 			.catch(err => {
        // 				console.log("error occured : " + err);
        // 			})
        // 	}
        // }
    }

    render() {
        let renderItem;
        if (this.state.condition === "1") {
            renderItem = (
                <Block middle>
                    <Button color="primary"
                        style={styles.createButton}
                        onPress={this.takeImage}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Take a photo
                        </Text>
                    </Button>
                </Block>
            )
        } else if (this.state.condition === "2") {
            renderItem = (
                <Block style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" />
                </Block>
            )
        } else if(this.state.condition === "3") {
            renderItem = (
                <Block middle>
                    <FlatList containerStyle
					data={this.state.retrievedStudents}
					renderItem={({ item, index }) => {
						if (this.state.totalStudents.find(el => el == item.name)) {
							console.log("HEY THERE");
							return (
                                <Button color="success"
                                    style={styles.createButton}
                                    onPress={this.takeImage}>
                                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                        {item.name}
                                    </Text>
                                </Button>
                            );
						} else {
							return (
								<Button color="error"
                                    style={styles.createButton}
                                    onPress={this.takeImage}>
                                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                        {item.name}
                                    </Text>
                                </Button>
							)
						}
					}}
					keyExtractor={item => item.id}
					ItemSeparatorComponent={this.renderSeparator}
					ListHeaderComponent={this.renderHeader}
				/>
                </Block>
            );
        }
        return (
            <Block flex middle>
                <StatusBar hidden />
                <ImageBackground
                    source={Images.RegisterBackground}
                    style={{ width, height, zIndex: 1 }}
                >
                    <Block flex middle>
                        <Block style={styles.registerContainer}>
                            <Block flex={0.25} middle style={styles.socialConnect}>
                                <Text color="#8898AA" size={12}>
                                    Sign up with
                </Text>
                                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                                    <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                                        <Block row>
                                            <Icon
                                                name="logo-github"
                                                family="Ionicon"
                                                size={14}
                                                color={"black"}
                                                style={{ marginTop: 2, marginRight: 5 }}
                                            />
                                            <Text style={styles.socialTextButtons}>GITHUB</Text>
                                        </Block>
                                    </Button>
                                    <Button style={styles.socialButtons}>
                                        <Block row>
                                            <Icon
                                                name="logo-google"
                                                family="Ionicon"
                                                size={14}
                                                color={"black"}
                                                style={{ marginTop: 2, marginRight: 5 }}
                                            />
                                            <Text style={styles.socialTextButtons}>GOOGLE</Text>
                                        </Block>
                                    </Button>
                                </Block>
                            </Block>
                            <Block flex>
                                <Block flex={0.17} middle>
                                    <Text color="#8898AA" size={12}>
                                        Click the button below to take a picture
                                    </Text>
                                </Block>
                                {renderItem}
                                {/* <Block flex center>
                                    <KeyboardAvoidingView
                                        style={{ flex: 1 }}
                                        behavior="padding"
                                        enabled
                                    >
                                        <Block middle>
                                            <Button color="primary" style={styles.createButton}>
                                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                                    CREATE ACCOUNT
                        </Text>
                                            </Button>
                                        </Block>
                                    </KeyboardAvoidingView>
                                </Block> */}
                            </Block>
                        </Block>
                    </Block>
                </ImageBackground>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    registerContainer: {
        width: width * 0.9,
        height: height * 0.78,
        backgroundColor: "#F4F5F7",
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden"
    },
    socialConnect: {
        backgroundColor: argonTheme.COLORS.WHITE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#8898AA"
    },
    socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: "#fff",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1
    },
    socialTextButtons: {
        color: argonTheme.COLORS.PRIMARY,
        fontWeight: "800",
        fontSize: 14
    },
    inputIcons: {
        marginRight: 12
    },
    passwordCheck: {
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 30
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25
    }
});

export default Register;
