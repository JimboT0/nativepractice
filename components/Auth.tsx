import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Image } from "@/components/ui/image";
import React, { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import {
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Pressable,
  Icon,
  ArrowLeftIcon,
  Heading,
  FormControl,
  FormControlLabel,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  InputField,
  Link,
} from "@/components/ui";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const ALLOWED_EMAILS = ["gabrial@gmail.com", "tom@gmail.com", "test@test.com"];

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) return "Invalid email address";
    if (!ALLOWED_EMAILS.includes(email)) return "Email is not authorized";
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    return password.length < 6 ? "Password must be at least 6 characters" : true;
  };

  const signInWithEmail = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        Alert.alert("Login Error", error.message);
      } else {
        Alert.alert("Success", "You are now signed in!");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HStack className="w-full h-full bg-background-0 flex-grow justify-center">
          <VStack
            className="relative hidden md:flex h-full w-full flex-1 items-center justify-center"
            space="md"
          >
            <Image
              // height="100%"
              // width="100%"
              source={require("@/assets/radialGradient.png")}
              className="object-cover h-full w-full"
              alt="Radial Gradient"
            />
          </VStack>

          <VStack
            className="flex-1 w-full h-full items-center justify-center p-6 md:p-10 bg-[url('@/assets/radialGradient.png')] md:bg-none bg-cover bg-center"
          >
            <VStack className="space-y-8">
              {/* Heading Section */}
              <VStack className="space-y-6 items-center">
                <Pressable>
                  <Icon
                    as={ArrowLeftIcon}
                    className="md:hidden text-gray-500"
                    size="xl"
                  />
                </Pressable>
                <VStack className="text-center">
                  <Heading className="text-3xl font-bold text-gray-800">
                    Log in
                  </Heading>
                  <Text className="text-gray-600 text-sm mt-1">
                    Enter your credentials to access your account.
                  </Text>
                </VStack>
              </VStack>

              {/* Email Input */}
              <VStack className="space-y-4">
                <FormControl isInvalid={!!errors?.email}>
                  <FormControlLabel>
                    <Text className="text-gray-700 text-sm font-medium">
                      Email
                    </Text>
                  </FormControlLabel>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ validate: validateEmail }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input>
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
                    <Text className="text-red-500 text-sm mt-2">
                      {errors.email.message}
                    </Text>
                  )}
                </FormControl>
              </VStack>

              {/* Password Input */}
              <VStack className="space-y-4">
                <FormControl isInvalid={!!errors?.password}>
                  <FormControlLabel>
                    <Text className="text-gray-700 text-sm font-medium">
                      Password
                    </Text>
                  </FormControlLabel>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ validate: validatePassword }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input>
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
                    <Text className="text-red-500 text-sm mt-2">
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>
              </VStack>

              {/* Remember Me and Forgot Password */}
              <HStack className="justify-between items-center mt-2">
                <Checkbox value={""}>
                  <CheckboxIndicator className="bg-gray-100 rounded">
                    <CheckboxIcon as={CheckIcon} className="text-white" />
                  </CheckboxIndicator>
                  <CheckboxLabel className="ml-2 text-gray-700 text-sm">
                    Remember me
                  </CheckboxLabel>
                </Checkbox>
                <Link href="/auth/forgot-password">
                  <Text className="text-sm text-blue-600 hover:underline">
                    Forgot Password?
                  </Text>
                </Link>
              </HStack>

              {/* Sign In Button */}
              <Button
                className={`w-full py-3 bg-black mt-4 mb-4 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                  loading ? " cursor-not-allowed" : ""
                }`}
                onPress={handleSubmit(signInWithEmail)}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Log In"}
              </Button>

              {/* Signup Link */}
              <VStack className="justify-center space-x-2">
                <Text className="text-gray-600 text-sm">
                  Don't have an account?
                </Text>
                <Link href="/auth/signup">
                  <Text className="text-blue-600 font-medium hover:underline">
                    Sign up
                  </Text>
                </Link>
              </VStack>
            </VStack>
          </VStack>
        </HStack>
      </ScrollView>
    </SafeAreaView>
  );
}
