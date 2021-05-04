import React, { useState, useRef } from "react";
import { captureRef } from 'react-native-view-shot'
import { Image, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { takeSnapshotAsync } from 'expo'
import { Camera } from "expo-camera";
import { sendPicture, testEndpoint } from "./apiModule";
import PeoplePng from "./assets/people.png";
import NotPng from "./assets/not.png";
import CouldPng from "./assets/could.png";
import RNDraw from 'expo-draw'

const PEOPLEPNG = "./assets/people.png";

const MainScreen = (props) => {
	const [resp, setResp] = useState()
	const drawRef = useRef(null)
	const [wordInput, setWordInput] = useState()
	const uri = [
		Image.resolveAssetSource(PeoplePng).uri,
		Image.resolveAssetSource(NotPng).uri,
		Image.resolveAssetSource(CouldPng).uri
	]

	const onPicture = async () => {
		captureRef(drawRef, {
			format: "jpg",
			quality: 0.8
		}).then(
			uri => {
				console.log("Image saved to", uri)
				sendPicture(uri, setResp)
			},
			error => console.error("Oops, snapshot failed", error)
		)
	}

	return (
		<View
			style={{
				height: "100%",
				width: "100%",
				backgroundColor: "yellow",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text>Write a word to try reading it!</Text>
			<View style={{ backgroundColor: 'green', height: 400, width: 400, borderWidth: 2  }}>
				{wordInput ? (
					// <Image source={require()} />
					<Text>{wordInput}</Text>
				) : (
					<RNDraw
						strokes={[]}
						containerStyle={{backgroundColor: 'white'}}
						rewind={(undo) => {console.log("undo")}}
						clear={(clear) => {this._clear = clear}}
						color={'black'}
						strokeWidth={10}
						enabled={true}
						// onChangeStrokes={(strokes) => console.log(strokes)}
						ref={drawRef}
					/>
				)}
			</View>
			<View style={{ flex: 1, flexDirection: 'row'}}>
				<TouchableOpacity style={{...styles.button, marginTop: 20, marginRight: 20}} onPress={onPicture}>
					<Text style={{ color: 'white'}}>Submit text</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{...styles.button, marginTop: 20}} onPress={() => drawRef.current.clear()}>
					<Text style={{ color: 'white'}}>Clear</Text>
				</TouchableOpacity>
			</View>
			<View style={{ height: 300, alignItems: "center", marginTop: 10 }}>
				<Text>Or try selecting some words!</Text>
				<TouchableOpacity
					onPress={() => sendPicture(uri[0], setResp)}
					style={{ flex: 1, marginTop: 20 }}
				>
					<Image source={require("./assets/people.png")} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => sendPicture(uri[1], setResp)}
					style={{ flex: 1, marginTop: 20 }}
				>
					<Image source={require("./assets/not.png")} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => sendPicture(uri[2], setResp)}
					style={{ flex: 1, marginTop: 20 }}
				>
					<Image source={require("./assets/could.png")} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 130,
		borderRadius: 4,
		backgroundColor: "#14274e",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 40,
	},
});

export default MainScreen;
