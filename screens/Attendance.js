import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    FlatList,
    KeyboardAvoidingView
} from "react-native";
import { Block, Switch, Checkbox, Text, theme,Input } from "galio-framework";

import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

import { Button, Icon } from "../components";
import { Images, argonTheme } from "../constants";

import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const { width, height } = Dimensions.get("screen");

function TickMark(props) {
    const navigation = useNavigation();

    return (
        <Button
            size="small"
            round
            style={styles.createButton}
            onPress={() => props.markAttendance(navigation)}>
            Click here to mark the attendance
                        
        </Button>
    );
}

const StudentEl = (props) => {
    let colorStyle = props.attend ? "success" : "error";
    const [attended, setAttendance] = useState(props.attend)
    const [color, setColor] = useState(colorStyle);

    useEffect(() => {
        colorStyle = attended ? "success" : "error";
        setColor(colorStyle);
    })


    const changeAttendance = () => {
        setAttendance(!attended);
        if (!attended) {
            props.addStud(props.item.name);
        } else {
            props.removeStud(props.item.name);
        }
    }

    return (

        <Button color={color}
            key ={props.item.name}
            disabled={props.disable}
            round
            style={styles.createButton}
            onPress={changeAttendance}
        >
            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                {props.item.name}
            </Text>
        </Button>
    );
}

class Register extends React.Component {
    state = {
        condition: "1",
        week: "",
        day : "",
        totalStudents: [],
        retrievedStudents: [],
        markStudents: [],
        obj:{}
    }

    componentWillUnmount(){
        this.setState(
            {
                condition: "1",
                totalStudents: [],
                retrievedStudents: [],
                markStudents: [],
                obj:{}
            }
        )
    }

    markAttendance = (navigation) => {
        let tempObj = this.state.obj;
        let markedOnes = this.state.markStudents;
        let tempDay = this.state.day;
        let tempWeek = this.state.week;
        tempObj.students = markedOnes;
        tempObj.week = tempWeek;
        tempObj.day = tempDay;
        axios.put('http://4bdb66428a8e.in.ngrok.io/attendance/mark', tempObj)
        .then(res => {
            console.log("Successful");
        })
        .catch(err => console.log("Err" + err));
        this.setState({
            condition : "1"
        });
        navigation.navigate("Pro");
        console.log("marked");
        console.log(this.state.markStudents);        
    }


    removeStud = (student) => {
        const arr = [...this.state.markStudents];
        // console.log(arr);
        var data = arr.filter(function (obj) {
            return obj.name !== student;
        });
        console.log(data);
        this.setState({
            markStudents: [...data]
        })
    }

    addStud = (student) => {
        console.log("Added" + student);
        // let tempId = this.state.id + 1;
        const arr = [...this.state.markStudents];
        arr.push({
            // "id": tempId,
            "name": student
        })

        this.setState({
            // id: tempId,
            markStudents: [...arr]
        })
    }

    askForPermission = async () => {
        const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
        if (permissionResult.status !== 'granted') {
            Alert.alert('no permissions to access camera!', [{ text: 'ok' }])
            return false
        }
        return true
    }

    takeImage = async () => {
        // make sure that we have the permission
        // this.setState({
        //     condition: "2"
        // })
        
        // setTimeout(() => {
        //     this.setState({
        //         condition: "3"
        //     })
        // }, 1000);
        // setIsShowingCamera("2");
        
        const hasPermission = await this.askForPermission()
        if (!hasPermission) {
        	return
        } else {
        	// launch the camera with the following settings
        	let image = await ImagePicker.launchCameraAsync({
        		mediaTypes: ImagePicker.MediaTypeOptions.Images,
        		allowsEditing: true,
        		aspect: [3, 3],
        		quality: 0.3,
        		base64: false,
        	})

        	// make sure a image was taken:
        	if (!image.cancelled) {
        		this.setState({
        			condition: "2"
        		})
        		await fetch('http://8091b29286b0.in.ngrok.io/api/test', {
        			method: 'POST',
        			headers: {
        				Accept: 'application/json',
        				'Content-Type': 'image/jpg',
        			},
        			body: image
        		})
        			.then(res => {
                        res.json().then((data) => {
                            this.setState({
                                obj : data
                            })
                            console.log('request succeeded with JSON response', data);
                            this.setState({
                                retrievedStudents : [...data.students],
                                markStudents : [...data.students]
                            });
                            var code = data.classCode;
                            axios.get(`http://4bdb66428a8e.in.ngrok.io/admin/IT/${code}`)
                            .then((res) => {
                                console.log("All students" + res.data[0])
                                this.setState({
                                    totalStudents : [...res.data[0]]
                                })
                                this.setState({
                                    condition: "3"
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            }) 
                         })
                        .catch(err => {
                            console.log('Data failed', error);
                        });

        				console.log("Succes : " + res);
        			})
        			.catch(err => {
        				console.log("error occured : " + err);
                    })
                    
        	}
        }
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
                    <Block style={{ marginTop: theme.SIZES.BASE }}>
                        <Block middle>
                            <Input type="numeric" onChange={(e)=> this.setState({ week : e.nativeEvent.text})} placeholder="Input Week No." color="black" rounded />
                        </Block>
                        <Block middle>
                            <Input type="numeric" onChange={(e)=> this.setState({ day : e.nativeEvent.text})} placeholder="Input Day No." color="black" rounded />
                        </Block>
                    </Block>
                    {/* {console.log(this.state)} */}
                    
                </Block>
                
            )
        } else if (this.state.condition === "2") {
            renderItem = (
                <Block style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" />
                </Block>
            )
        } else if (this.state.condition === "3") {
            renderItem = (
                <Block middle>
                    <FlatList containerStyle
                        data={this.state.totalStudents}
                        renderItem={({ item, index }) => {
                            if (this.state.retrievedStudents.find(el => el.name == item.name)) {
                                // console.log("HEY THERE");
                                // {this.state.markStudents.push(item)}
                                // {console.log("Green ::: " + item)}
                                return (
                                    <StudentEl
                                        key={item.name}
                                        item={item}
                                        attend
                                        disable={true}
                                        addStud={this.addStud}
                                        removeStud={this.removeStud}
                                    />
                                );
                            } else {
                                // {console.log("Red ::: " + item)}
                                return (
                                    
                                    <StudentEl
                                        key={item.name}
                                        item={item}
                                        addStud={this.addStud}
                                        removeStud={this.removeStud}
                                    />
                                )
                            }
                        }}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                    />
                    <TickMark 
                        markAttendance={this.markAttendance}
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
                                <Text center color="#8898AA" size={22}>
                                    Click On Student Name with red to 
                                    add it manually for attendance :)
                </Text>
                                {/* <Block row style={{ marginTop: theme.SIZES.BASE }}>
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
                                </Block> */}
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
