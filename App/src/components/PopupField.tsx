import { StyleSheet, View, Modal } from "react-native";
import AddTextField from "./AddTextField";
import { Dispatch, SetStateAction, useState } from "react";
import RoundBtn from "./RoundBtn";

type PopupFieldProps = {
    onEnter: (value: string) => void,
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    fieldPlaceholder?: string,
    fieldUnit?: string,
};

export default function PopupField({
    onEnter,
    visible,
    setVisible,
    fieldPlaceholder = "",
    fieldUnit = "",
}: PopupFieldProps)
{
    const [value, setValue] = useState("");

    return (
        <Modal
            visible={visible}
            transparent={true}
            onShow={() => setValue("")}
            onRequestClose={() => setVisible(false)}
            animationType="slide"
        >
            <View style={styles.cont}>
                <AddTextField
                    value={value}
                    onChangeText={setValue}
                    placeholder={fieldPlaceholder}
                    unit={fieldUnit}
                />
                <RoundBtn
                    icon="check"
                    btnColor="#98C379"
                    onClick={() => {
                        onEnter(value);
                        setVisible(false);
                }}/>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    cont: {
        backgroundColor: "#fefefe",
        zIndex: 1000,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        padding: 20,
        margin: 40,
        borderRadius: 10,
        top: "30%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
});