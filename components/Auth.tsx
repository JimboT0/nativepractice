
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Image } from "@/components/ui/image";
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { Box, VStack, HStack, Text, Input, Button, Pressable, Icon, ArrowLeftIcon, Heading, FormControl, FormControlLabel, ButtonIcon, ButtonText, Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, EyeIcon, EyeOffIcon, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabelText, InputField, InputIcon, InputSlot, Link, LinkText } from './ui';
import { AlertTriangle } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';


type FormData = {
  email: string;
  password: string;
};

export default function Auth() {

  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors }, setError } = useForm<FormData>();

  // Email and Password validation functions
  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !emailRegex.test(email) ? 'Invalid email address' : true;
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    return password.length < 6 ? 'Password must be at least 6 characters' : true;
  };

  const signInWithEmail = async (data: { email: string; password: string }) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      Alert.alert('Success', 'You are now signed in!');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HStack className="w-full h-full bg-background-0 flex-grow justify-center">
          <VStack
            className="relative hidden md:flex h-full w-full flex-1  items-center  justify-center"
            space="md"
          >
            <Image
              height="100%"
              width="100%"
              source={require("@/assets/radialGradient.png")}
              className="object-cover h-full w-full"
              alt="Radial Gradient"
            />
          </VStack>




          <VStack
            className="flex-1 w-full h-full items-center justify-center p-6 md:p-10 bg-[url('@/assets/radialGradient.png')] md:bg-none bg-cover bg-center"
          >
            <Box className="p-6 md:p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
              <VStack className="space-y-6">
                <VStack className="space-y-4 items-center">
                  <Pressable>
                    <Icon as={ArrowLeftIcon} className="md:hidden text-gray-500" size="xl" />
                  </Pressable>
                  <VStack className="text-center">
                    <Heading className="text-2xl font-bold text-gray-800">Log in</Heading>
                  </VStack>
                </VStack>

                {/* Email input */}
                <VStack className="space-y-2">
                  <FormControl isInvalid={!!errors?.email}>
                    <FormControlLabel>
                      <FormControlLabelText className="text-gray-700">Email</FormControlLabelText>
                    </FormControlLabel>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ validate: validateEmail }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-blue-500">
                          <InputField
                            placeholder="Enter email"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            className="text-sm text-gray-800"
                          />
                        </Input>
                      )}
                    />
                    {errors?.email && (
                      <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>
                    )}
                  </FormControl>
                </VStack>

                {/* Password input */}
                <VStack className="space-y-2">
                  <FormControl isInvalid={!!errors?.password}>
                    <FormControlLabel>
                      <FormControlLabelText className="text-gray-700">Password</FormControlLabelText>
                    </FormControlLabel>
                    <Controller
                      name="password"
                      control={control}
                      rules={{ validate: validatePassword }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-blue-500">
                          <InputField
                            secureTextEntry
                            placeholder="Enter password"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            className="text-sm text-gray-800"
                          />
                        </Input>
                      )}
                    />
                    {errors?.password && (
                      <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
                    )}
                  </FormControl>
                </VStack>

                {/* Remember me and forgot password */}
                <HStack className="justify-between items-center space-y-2">
                  <Checkbox>
                    <CheckboxIndicator className="bg-gray-100 rounded">
                      <CheckboxIcon as={CheckIcon} className="text-white" />
                    </CheckboxIndicator>
                    <CheckboxLabel className="ml-2 text-gray-700">Remember me</CheckboxLabel>
                  </Checkbox>
                  <Link href="/auth/forgot-password">
                    <Text className="text-sm text-blue-600 hover:underline">Forgot Password?</Text>
                  </Link>
                </HStack>

                {/* Sign in button */}
                <Button
                  className={`w-full py-2 bg-black text-white rounded-md hover:bg-blue-500 focus:ring focus:ring-blue-400 ${loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  onPress={handleSubmit((data: FormData) => signInWithEmail(data))}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Log In"}
                </Button>

                {/* Signup link */}
                <HStack className="justify-center space-x-2">
                  <Text className="text-gray-600">Don't have an account?</Text>
                  <Link href="/auth/signup">
                    <Text className="text-blue-600 font-medium hover:underline">Sign up</Text>
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </VStack>




        </HStack>
      </ScrollView>
    </SafeAreaView>
  );
};


