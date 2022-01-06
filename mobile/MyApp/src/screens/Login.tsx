import React, {useContext, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Input, Layout, Divider, Text} from '@ui-kitten/components';
import {Formik, useFormik} from 'formik';
import {MainContext} from "../contexts/main.context";

const initialValues = {
  ethAccount: '',
};

export const LoginScreen = props => {
  const {values, handleChange, handleSubmit} = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values)
    },
  })
  const context = useContext(MainContext);

  const submit = () => {

  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Input
              placeholder="Eth address"
              value={values.ethAccount}
              onChangeText={handleChange('ethAccount')}
              label={evaProps => (
                <Text {...evaProps}>Eth account address</Text>
              )}
              style={{
                marginHorizontal: 3,
                marginVertical: 3,
              }}
            />
            <Button
              onPress={submit}
              size="small"
            >
              Login
            </Button>
          </View>
      </Layout>
    </SafeAreaView>
  );
};
