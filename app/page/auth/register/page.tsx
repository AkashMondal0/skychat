import React, { Suspense, useCallback, useContext, useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Eye, EyeOff, ImagePlus, XCircle } from 'lucide-react-native';
import { ProfileContext } from '../../../../provider/Profile_Provider';
import { RootState } from '../../../../redux/store';
import Icon_Button from '../../../../components/shared/IconButton';
import MyButton from '../../../../components/shared/Button';
import Padding from '../../../../components/shared/Padding';
import MyInput from '../../../../components/shared/Input';
import { registerApi } from '../../../../redux/slice/auth';
import Avatar from '../../../../components/shared/Avatar';
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = ({ navigation }: any) => {
    const profileContext = useContext(ProfileContext)
    const { error, loading, isLogin } = useSelector((state: RootState) => state.authState)
    const useTheme = useSelector((state: RootState) => state.ThemeMode.currentTheme)
    const [showPassword, setShowPassword] = React.useState(true);
    const [image, setImage] = React.useState<any>(null);
    const dispatch = useDispatch();

    const { control, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
            email: '',
        }
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }


    const handleRegister = useCallback((data: {
        username: string,
        password: string,
        email: string,
    }, _image: string) => {
        dispatch(registerApi({ ...data, image: _image }) as any)
    }, []);

    useEffect(() => {
        if (isLogin) {
            profileContext.fetchUserData?.()
            navigation.navigate('home')
        }
    }, [isLogin])

    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 20,
            marginTop: StatusBar.currentHeight || 0,
        }}>
            <Icon_Button
                onPress={() => navigation.goBack()}
                size={30} icon={<ArrowLeft
                    size={30} color={useTheme.textColor} />}
                theme={useTheme} />

            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text style={{
                    fontSize: 32,
                    fontWeight: '700',
                    color: useTheme.textColor,
                    textAlign: 'center',
                }}>
                    Create an account
                </Text>
                <Text style={{
                    fontSize: 15,
                    color: useTheme.textColor,
                    marginBottom: 40,
                    marginHorizontal: 25,
                    textAlign: "center"
                }}>
                    Log in to your existing account of Next Chat
                </Text>
                <Suspense>
                    {
                        image ?
                            <View style={{
                                width: 120,
                                height: 120,
                            }}>
                                <Avatar
                                    size={120}
                                    url={image}
                                    onPress={pickImage}/>
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        backgroundColor: useTheme.primaryBackground,
                                        borderRadius: 20,
                                    }}
                                    onPress={() => setImage(null)}>
                                    <XCircle size={30} color={useTheme.DangerButtonColor} />
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity onPress={pickImage} style={{
                                width: 120,
                                height: 120,
                                borderRadius: 60,
                                backgroundColor: useTheme.primaryBackground,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <View>
                                    <ImagePlus size={60} color={useTheme.iconColor} />
                                </View>
                            </TouchableOpacity>}
                </Suspense>
                <Text style={{
                    fontSize: 15,
                    color: useTheme.DangerButtonColor,
                    textAlign: "left",
                    fontWeight: 'bold',
                    margin: 10,
                }}>
                    {error}
                </Text>
                <MyInput theme={useTheme}
                    placeholder='Username'
                    textContentType="name"
                    keyboardType="default"
                    returnKeyType="next"
                    control={control}
                    height={50}
                    name='username' />
                <Padding size={10} />

                <MyInput theme={useTheme}
                    placeholder='Email'
                    textContentType='emailAddress'
                    keyboardType="email-address"
                    returnKeyType="next"
                    height={50}
                    control={control} name='email' />
                <Padding size={10} />

                <MyInput theme={useTheme}
                    placeholder='Password'
                    textContentType='password'
                    returnKeyType="done"
                    height={50}
                    passwordHide={showPassword}
                    rightIcon={showPassword ? <TouchableOpacity onPress={() => setShowPassword(false)}>
                        <Eye color={useTheme.LinkButtonColor} />
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => setShowPassword(true)}>
                            <EyeOff color={useTheme.LinkButtonColor} />
                        </TouchableOpacity>
                    }
                    control={control}
                    name='password' />
                <Padding size={20} />

                <MyButton theme={useTheme}
                    onPress={handleSubmit((data) => handleRegister(data, image))}
                    width={"100%"}
                    radius={10}
                    fontWeight={'bold'}
                    loading={loading}
                    disabled={loading}
                    title={'Register'} />
            </View>
        </SafeAreaView>
    );
};



export default RegisterScreen;
